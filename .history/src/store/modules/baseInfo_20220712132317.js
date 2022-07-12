import {} from "vuex";
import tool from '../../utils/tool'

export default {
	state: {
    // 基础信息
    BASE_INFO: tool.data.get('BASE_INFO') || {},
		// 基地列表
		BASES: tool.data.get('BASES') || [],
		// 鸽棚列表
		DOVECOTES: tool.data.get('DOVECOTES') || [],
		// 当前信息
		CURR_INFO: tool.data.get('CURR_INFO') || {},
		// 鸽棚编号
		SHED_ID: tool.data.get('CURR_INFO').CURR_SHED.id || ''
	},
	mutations: {
		setBaseInfo(state, basesInfo) {
			state.BASE_INFO = basesInfo;
		},
		setBase(state, bases) {
			state.BASES = bases;
		},
		setDoveCotes(state, dovecotes) {
			state.DOVECOTES = dovecotes;
		},
		setCurrInfo(state, currInfo) {
			state.CURR_INFO = currInfo;
		},
		setShedId(state, currShedId) {
			state.CURR_INFO = currShedId;
		}
	},
};
