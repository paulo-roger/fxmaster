import { FXMasterParticleEffect } from "./effect.js";

/**
 * A full-screen weather effect which renders drifting snowflakes.
 */
export class SnowParticleEffect extends FXMasterParticleEffect {
  /** @override */
  static label = "WEATHER.Snow";

  /** @override */
  static get icon() {
    return "modules/fxmaster/assets/particle-effects/icons/snow.png";
  }

  /** @override */
  static get group() {
    return "weather";
  }

  /**
   * Configuration for the particle emitter for snow
   * @type {PIXI.particles.EmitterConfigV3}
   */
  static SNOW_CONFIG = {
    lifetime: { min: 4, max: 4 },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              { time: 0, value: 0.9 },
              { time: 1, value: 0.5 },
            ],
          },
        },
      },
      {
        type: "moveSpeed",
        config: {
          speed: {
            list: [
              { time: 0, value: 190 },
              { time: 1, value: 210 },
            ],
          },
          minMult: 0.6,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              { time: 0, value: 0.2 },
              { time: 1, value: 0.4 },
            ],
          },
          minMult: 0.5,
        },
      },
      {
        type: "rotation",
        config: { accel: 0, minSpeed: 0, maxSpeed: 200, minStart: 50, maxStart: 75 },
      },
      {
        type: "textureSingle",
        config: {
          texture: "ui/particles/snow.png",
        },
      },
    ],
  };

  /** @override */
  static get defaultConfig() {
    return this.SNOW_CONFIG;
  }

  /** @override */
  getParticleEmitters(options = {}) {
    options = this.constructor.mergeWithDefaults(options);
    const d = canvas.dimensions;
    const maxParticles = (d.width / d.size) * (d.height / d.size) * options.density.value;
    const config = foundry.utils.deepClone(this.constructor.SNOW_CONFIG);
    config.maxParticles = maxParticles;
    config.frequency = (config.lifetime.min + config.lifetime.max) / 2 / maxParticles;
    config.behaviors.push({
      type: "spawnShape",
      config: {
        type: "rect",
        data: { x: 0, y: -0.1 * d.height, w: d.width, h: d.height },
      },
    });
    this.applyOptionsToConfig(options, config);
    return [this.createEmitter(config)];
  }
}
