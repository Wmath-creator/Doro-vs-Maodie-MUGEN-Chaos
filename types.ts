
export enum CharacterId {
  DORO = 'DORO',
  MAODIE = 'MAODIE'
}

export enum PlayerState {
  IDLE = 'IDLE',
  WALK = 'WALK',
  DASH = 'DASH',
  JUMP = 'JUMP',
  ATTACK = 'ATTACK',
  SKILL = 'SKILL',
  ULTIMATE = 'ULTIMATE',
  HIT = 'HIT',
  DEAD = 'DEAD',
  WIN = 'WIN'
}

export type HitboxVisual = 'BITE' | 'CLAW' | 'BEAM' | 'DRILL' | 'SPIKE' | 'SWEEP' | 'EXPLOSION' | 'NONE' | 'SPIN' | 'SLAM';

export interface Hitbox {
  id: string; // Unique ID to prevent multi-hit on same frame
  ownerId: string;
  xOffset: number;
  yOffset: number;
  width: number;
  height: number;
  damage: number;
  duration: number; // Frames
  knockbackX: number;
  knockbackY: number;
  type: 'NORMAL' | 'HEAVY' | 'ULTIMATE' | 'PROJECTILE';
  visualType: HitboxVisual;
  effect?: 'CONFUSION' | 'STUN' | 'EXPLOSION';
}

export interface Projectile {
  id: string;
  ownerId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  damage: number;
  color: string;
  isExplosive: boolean;
  isVacuum?: boolean; // Maodie's suction
  life: number;
}

export interface Player {
  id: string;
  characterId: CharacterId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  delayedHp: number; // For visual catch-up
  energy: number;
  maxEnergy: number;
  direction: 1 | -1; // 1 right, -1 left
  state: PlayerState;
  stateTimer: number;
  isGrounded: boolean;
  isCrouching: boolean;
  color: string;
  activeHitbox: Hitbox | null;
  invulnTimer: number;
  // New Mechanics
  jumps: number;
  maxJumps: number;
  comboStep: number;
  confusedTimer: number;
  transformationActive: boolean; // Doro Awaken
  superArmor: boolean; // Maodie passive
  assistCooldown: number;
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  vy: number;
  size: number;
}

export interface HitEffect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visualType: HitboxVisual;
  life: number;
  maxLife: number;
  direction: 1 | -1;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameState {
  p1: Player;
  p2: Player;
  projectiles: Projectile[];
  particles: Particle[];
  floatingTexts: FloatingText[];
  hitEffects: HitEffect[];
  cameraShake: number;
  gameOver: boolean;
  winner: string | null;
  commentary: string;
  cutIn: { active: boolean; text: string; color: string; timer: number } | null; // For Ultimates
  camera: { x: number; y: number };
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  type?: 'TEXT' | 'SHAPE';
  text?: string;
}
