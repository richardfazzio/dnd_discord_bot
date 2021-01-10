const ACTIONS = {
    ROLL_DICE: /^!roll\s*\d*$/,
    ROLL_STAT: /^!roll stat$/,
    ROLL_STATS: /^!roll stats\s*\d*$/
};

const DEFAULTS = {
    DIE_ROLL: 20,
    STAT_DIE: 6,
    NUMBER_OF_DIE: 6
};

const handleResponse = (msg) => {
	const { content } = msg;
	if (ACTIONS.ROLL_DICE.test(content)) {
		return rollDice(content);
    } else if (ACTIONS.ROLL_STAT.test(content)) {
		return rollStat(content);
	} else if (ACTIONS.ROLL_STATS.test(content)) {
		return rollStats(content);
	}
};

const roll = (num) => {
	return Math.ceil(Math.random() * num);
};

const rollStat = () => {
    return roll(DEFAULTS.STAT_DIE) + roll(DEFAULTS.STAT_DIE) + roll(DEFAULTS.STAT_DIE);
}

// Returns a list of stats of length n
const rollStats = (content) => {
    let [action, stats, n] = content.split(' ');
    n = n || DEFAULTS.NUMBER_OF_DIE;
    const results = [];
    for (let i = 0; i < +n; i++) {
        const stat = rollStat();
        results.push(stat);
    }
    return results.join(', ');
}

// Rolls a die between 1 and the second term in the content
const rollDice = (content) => {
	let [command, n] = content.split(' ');
	n = n || DEFAULTS.DIE_ROLL;
	return roll(+n);
};

module.exports = {
	handleResponse
};
