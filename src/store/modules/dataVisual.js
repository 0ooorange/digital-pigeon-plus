import {} from "vuex";

export default {
	state: {
    // 基地
    CURR_BASE: {},
    // 鸽棚
    CURR_SHED: {},
	},
	mutations: {
		setCurrBase(state, base) {
			state.CURR_BASE = base;
		}, 
		setCurrShed(state, shed) {
			state.CURR_SHED = shed;
		}
	},
};
