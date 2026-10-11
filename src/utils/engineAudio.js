class EngineAudio {
    constructor() {
        this.ctx = null;
        this.osc1 = null;
        this.osc2 = null;
        this.noise = null;
        this.masterGain = null;
        this.lpf = null;
        this.isPlaying = false;
        this.isMuted = true;
        this.baseFreq = 30; // Idle engine hum
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0; // Start silenced
            this.masterGain.connect(this.ctx.destination);

            // Low pass filter to make it sound muffled/bassy
            this.lpf = this.ctx.createBiquadFilter();
            this.lpf.type = 'lowpass';
            this.lpf.frequency.value = 300;
            this.lpf.connect(this.masterGain);

            // Oscillator 1 - Sub/Base engine rumble (Sawtooth)
            this.osc1 = this.ctx.createOscillator();
            this.osc1.type = 'sawtooth';
            this.osc1.frequency.value = this.baseFreq;
            this.osc1.connect(this.lpf);

            // Oscillator 2 - Overtones/revs (Square)
            this.osc2 = this.ctx.createOscillator();
            this.osc2.type = 'square';
            this.osc2.frequency.value = this.baseFreq * 1.5;

            const osc2Gain = this.ctx.createGain();
            osc2Gain.gain.value = 0.5;
            this.osc2.connect(osc2Gain);
            osc2Gain.connect(this.lpf);

            this.osc1.start();
            this.osc2.start();

            this.initialized = true;
        } catch (e) {
            console.warn("AudioContext creation failed", e);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (!this.isMuted && this.ctx?.state === 'suspended') {
            this.ctx.resume();
        }
        // If we're not moving, we shouldn't hear much anyway, but we set volume instantly.
        if (!this.isMuted && this.isPlaying) {
            this.masterGain.gain.setTargetAtTime(0.5, this.ctx.currentTime, 0.1);
        } else {
            this.masterGain?.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.1);
        }
    }

    updateVelocity(vel) {
        if (!this.initialized || this.isMuted) return;

        // vel is usually between -something and +something. Absolute it.
        const speed = Math.abs(vel);

        // Threshold to consider "stopped"
        if (speed < 0.001) {
            this.isPlaying = false;
            this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3); // fade out
            this.osc1.frequency.setTargetAtTime(this.baseFreq, this.ctx.currentTime, 0.5);
            this.osc2.frequency.setTargetAtTime(this.baseFreq * 1.5, this.ctx.currentTime, 0.5);
            this.lpf.frequency.setTargetAtTime(300, this.ctx.currentTime, 0.5);
            return;
        }

        if (!this.isPlaying) {
            this.isPlaying = true;
            if (this.ctx.state === 'suspended') this.ctx.resume();
        }

        // Scale engine params based on speed
        // max expected velocity in GSAP scrub is typically bounded but can spike
        const normalizedSpeed = Math.min(speed / 50, 1);

        const targetFreq = this.baseFreq + normalizedSpeed * 150; // Pitch up as speed increases
        const targetFilter = 300 + normalizedSpeed * 2000; // Open filter to make it brighter
        const targetVol = 0.2 + normalizedSpeed * 0.8; // Max vol 1.0

        this.osc1.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
        this.osc2.frequency.setTargetAtTime(targetFreq * 1.5, this.ctx.currentTime, 0.1);
        this.lpf.frequency.setTargetAtTime(targetFilter, this.ctx.currentTime, 0.1);
        this.masterGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.1);
    }

    cleanup() {
        if (this.ctx) {
            this.ctx.close();
            this.initialized = false;
        }
    }
}

export const engineAudio = new EngineAudio();
