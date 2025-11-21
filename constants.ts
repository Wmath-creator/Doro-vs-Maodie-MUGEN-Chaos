
import { CharacterId, Player, PlayerState, Platform } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 450;

// World Size (Massive Map Upgrade)
export const WORLD_WIDTH = 3200;
export const WORLD_HEIGHT = 1600;
export const GROUND_Y = 1400; // Ground level near bottom

export const GRAVITY = 0.8;
export const FRICTION = 0.85;
export const JUMP_FORCE = -22; // Increased jump force for verticality
export const MAX_ENERGY = 300;

// Complex Map: Ruined City in the Sky
export const PLATFORMS: Platform[] = [
  // --- Left Watchtower ---
  { x: 100, y: 1100, width: 200, height: 20 },
  { x: 100, y: 800, width: 180, height: 20 },
  { x: 150, y: 500, width: 100, height: 20 }, // Sniper perch

  // --- Central Fortress (Multi-tiered) ---
  // Base Tier
  { x: 800, y: 1200, width: 1600, height: 40 },
  // Mid Tier
  { x: 1000, y: 950, width: 1200, height: 30 },
  { x: 900, y: 950, width: 50, height: 20 }, // Step left
  { x: 2250, y: 950, width: 50, height: 20 }, // Step right
  // Top Tier (Arena)
  { x: 1200, y: 700, width: 800, height: 30 },
  
  // --- Sky Bridge / Floating Islands (Right side) ---
  { x: 2600, y: 1100, width: 400, height: 20 },
  { x: 2800, y: 800, width: 300, height: 20 },
  { x: 2500, y: 500, width: 150, height: 20 }, // High island
  { x: 2900, y: 300, width: 100, height: 20 }, // Highest point

  // --- Parkour Connectors (Small steps) ---
  { x: 500, y: 1000, width: 100, height: 20 },
  { x: 2500, y: 1000, width: 80, height: 20 },
  { x: 600, y: 650, width: 80, height: 20 },
];

export interface LevelConfig {
  id: number;
  title: string;
  maodieHp: number;
  maodieScale: number;
  maodieColor: string;
}

export const LEVELS: LevelConfig[] = [
  { id: 0, title: "Stage 1: 幼年期", maodieHp: 600, maodieScale: 0.8, maodieColor: '#5F9EA0' }, // Easy start
  { id: 1, title: "Stage 2: 成熟期", maodieHp: 1500, maodieScale: 1.1, maodieColor: '#2F4F4F' }, // Moderate
  { id: 2, title: "Stage 3: 完全体", maodieHp: 3500, maodieScale: 2.0, maodieColor: '#000000' }  // Boss (Nerfed from 8000)
];

export const CHAR_CONFIG = {
  [CharacterId.DORO]: {
    width: 50,
    height: 70,
    color: '#FF69B4', // Pink
    name: 'Doro',
    maxHp: 2000, // Buffed from 1000
    walkSpeed: 9,
    dashSpeed: 18,
    jumpForce: -22,
    maxJumps: 2,
    superArmor: false
  },
  [CharacterId.MAODIE]: {
    width: 90,
    height: 110,
    color: '#2F4F4F', // Dark Slate Gray (Default, overridden by level)
    name: '耄耋',
    maxHp: 1500,
    walkSpeed: 2.5, // Nerfed from 3.5
    dashSpeed: 6,   // Nerfed from 8
    jumpForce: -16,
    maxJumps: 1,
    superArmor: true
  }
};

export const INITIAL_PLAYER_STATE = (id: string, charId: CharacterId, x: number): Player => ({
  id,
  characterId: charId,
  x,
  y: 0, // Will snap to ground
  vx: 0,
  vy: 0,
  width: CHAR_CONFIG[charId].width,
  height: CHAR_CONFIG[charId].height,
  hp: CHAR_CONFIG[charId].maxHp,
  maxHp: CHAR_CONFIG[charId].maxHp,
  delayedHp: CHAR_CONFIG[charId].maxHp, // Initialize equal to maxHp
  energy: 0, // Start with 0 energy
  maxEnergy: MAX_ENERGY,
  direction: x < WORLD_WIDTH / 2 ? 1 : -1,
  state: PlayerState.IDLE,
  stateTimer: 0,
  isGrounded: false,
  isCrouching: false,
  color: CHAR_CONFIG[charId].color,
  activeHitbox: null,
  invulnTimer: 0,
  jumps: 0,
  maxJumps: CHAR_CONFIG[charId].maxJumps,
  comboStep: 0,
  confusedTimer: 0,
  transformationActive: false,
  superArmor: CHAR_CONFIG[charId].superArmor,
  assistCooldown: 0
});