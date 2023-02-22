import Decimal, { DecimalSource } from "break_eternity.js";
import { computed } from "vue";
import { STAGE_DATA } from "../data/stageData";
import { formatWhole } from "./format";
import { player } from "./playerControl";

export const stageData = computed(() => getStageData(player.stage));
export const enemiesInStage = computed(() => stageData.value.data.length);

export function getStageData(stage: DecimalSource) {
    let totalStages = Object.keys(STAGE_DATA).length;
    let activeStage = Decimal.sub(stage, Decimal.sub(stage, 1).div(totalStages).floor().times(totalStages)).toNumber();

    let data = STAGE_DATA[activeStage.toString()];
    let rank = Decimal.sub(stage, 1).div(totalStages).floor().times(Math.floor(totalStages * 2 / 3))
            .plus(Decimal.sub(stage, 1).sub(totalStages).div(2).floor().max(0))
            .plus(data[new Decimal(player.enemiesDefeated).toNumber() % data.length][1]);

    let mag = Decimal.pow(2.5, rank.sub(1));
    return {data, rank, mag};   
}

export function prevStage() {
	player.stage = Decimal.sub(player.stage, 1).max(1);
	resetStage();
}

export function nextStage() {
	player.stage = Decimal.add(player.stage, 1).min(player.bestStage);
	resetStage();
}

export function resetStage() {
	player.enemiesDefeated = 0;
	player.damageDealt = 0;
	player.attackCooldown = 0;
	player.damageTaken = 0;
	player.enemyAttackCooldown = 0;
	player.enemyAttacks = 0;
}

export function getStageName(stage: Decimal) {
	const totalStages = Object.keys(STAGE_DATA).length;
	const activeStage = stage.sub(stage.sub(1).div(totalStages).floor().times(totalStages));
	const xFactor = stage.sub(1).div(totalStages).floor();

	return formatWhole(activeStage) + (xFactor.gt(0) ? ("X" + (xFactor.gt(1) ? formatWhole(xFactor) : "")) : "");
}