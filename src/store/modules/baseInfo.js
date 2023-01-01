import {} from "vuex";
import tool from '../../utils/tool'

export default {
	state: {
    // 基础信息
    USER_INFO: tool.data.get('USER_INFO') || {},
		// 基地列表
		BASES: tool.data.get('BASES') || [],
		// 鸽棚列表
		DOVECOTES: tool.data.get('DOVECOTES') || [],
		// 当前信息
		CURR_INFO: tool.data.get('CURR_INFO') || {},
		// 鸽棚编号
		SHED_ID: tool.data.get('CURR_INFO') && tool.data.get('CURR_INFO').CURR_SHED.id !== '' ? tool.data.get('CURR_INFO').CURR_SHED.id : '1518124016571797507'
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.USER_INFO = userInfo;
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
			state.SHED_ID = currShedId;
		}
	},
};
