<template>
  <div>
    <div class="header">
      <el-button @click="showDetail('add')">添加基地</el-button>
      <el-dropdown trigger="click">
        <el-button>{{ selectDivision }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in divisionDropDownData"
              :key="key"
              @click="handleDepartmentId(item.id, item.name)"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <scTable
      class="table"
      ref="table"
      row-key="id"
      :data="tableList"
      hidePagination
      stripe
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="80"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="部门名称"
        prop="departmentName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="基地名称"
        prop="baseName"
        width="110"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="负责人"
        prop="userName"
        width="90"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话号码"
        prop="phone"
        width="120"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="车间/棚数量"
        prop="shedNumber"
        width="140"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="规模"
        prop="scale"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        label="面积"
        prop="area"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="control-btn">
            <el-button
              type="warning"
              plain
              @click="showDetail('editor', scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" plain @click="dataDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </scTable>
    <div class="pagination">
      <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="dialogEditor"
      :show-close="false"
      center
      class="dialogEditor"
    >
      <div class="baseInfo">
        <el-form :model="FormData.values" label-width="120px" :rules="rules">
          <el-form-item label="基地名称" prop="baseName">
            <el-input v-model="FormData.values.baseName" />
          </el-form-item>
          <el-form-item label="基地编码" prop="code">
            <el-input v-model="FormData.values.code" />
          </el-form-item>
          <el-form-item label="所属部门" prop="departmentId">
            <el-select
              v-model="FormData.values.departmentId"
              placeholder="选择部门"
              :disabled="disabledDivisionDropDown"
            >
              <el-option
                v-for="(item, key) in divisionDropDownData"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="userId">
            <el-select
              v-model="FormData.values.userId"
              placeholder="选择负责人"
            >
              <el-option
                v-for="(item, key) in userDropDownData"
                :key="key"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="规模" prop="scale">
            <el-input v-model="FormData.values.scale" />
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-input v-model="FormData.values.area" />
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-select
              v-model="FormData.values.provinceIndex"
              placeholder="选择省份"
            >
              <el-option
                v-for="(item, key) in provinceData"
                :key="key"
                :label="item.name"
                :value="item.index"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="FormData.values.city" placeholder="选择城市">
              <el-option
                v-for="(item, key) in cityData"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input
              v-model="FormData.values.address"
              type="textarea"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="otherInfo">
        <div class="introduction">
          <el-form label-position="top" :rules="rules">
            <el-form-item label="基地简介" prop="introduction">
              <el-input
                v-model="FormData.values.introduction"
                type="textarea"
                rows="8"
                resize="none"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="mapChoose">
          <div class="map-title">
            <span>地图选择</span>
          </div>
          <div class="map">
            <Map @getlongitude="getlongitude" @getlatitude="getlatitude"></Map>
          </div>
          <div class="mapForm">
            <el-form :model="FormData.values" :rules="rules">
              <el-form-item label="经度" prop="longitude">
                <el-input v-model="FormData.values.longitude" />
              </el-form-item>
              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="FormData.values.latitude" />
              </el-form-item>
              <el-form-item>
                <div class="control-btn">
                  <el-button type="primary" plain @click="onSubmit"
                    >确认</el-button
                  >
                  <el-button @click="dialogEditor = false">取消</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBaseInfoApi,
  editBaseInfoApi,
  addBaseInfoApi,
  deleteBaseByIdApi,
  getDivisionDropDownApi,
  getShedDropDownApi,
} from "@api/baseInformation/baseInfoMana";
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Map from "./map.vue";

export default {
  name: "baseMana", // 基地管理

  components: { Map },

  setup() {
    onMounted(() => {
      getData();
      getDropDown();
    });

    const selectDivision = ref("选择部门");
    const disabledDivisionDropDown = ref(false);
    const total = ref(0);
    const departmentId = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 下拉框数据
    let divisionDropDownData = reactive([]);
    let userDropDownData = reactive([]);

    // 表格数据
    let tableList = reactive([]);

    // 表单数据
    let FormData = reactive([]);
    FormData.values = {
      baseId: "",
      address: "",
      area: "",
      baseName: "",
      city: "",
      code: "",
      departmentId: "",
      latitude: "",
      longitude: "",
      province: "",
      provinceIndex: "",
      userId: "",
      introduction: "",
      scale: "",
    };

    const rules = reactive({
      baseName: [
        {
          required: true,
          message: "请输入基地名称",
          trigger: "blur",
        },
      ],
      code: [
        {
          required: true,
          message: "请输入基地编码",
          trigger: "blur",
        },
      ],
      departmentId: [
        {
          required: true,
          message: "请选择所属部门",
          trigger: "blur",
        },
      ],
      userId: [
        {
          required: true,
          message: "请选择负责人",
          trigger: "blur",
        },
      ],
      scale: [
        {
          required: false,
        },
      ],
      area: [
        {
          required: true,
          message: "请输入面积",
          trigger: "blur",
        },
      ],
      province: [
        {
          required: true,
          message: "请选择省份",
          trigger: "blur",
        },
      ],
      city: [
        {
          required: true,
          message: "请选择城市",
          trigger: "blur",
        },
      ],
      address: [
        {
          required: true,
          message: "请输入详细地址",
          trigger: "blur",
        },
      ],
      introduction: [
        {
          required: false,
        },
      ],
      longitude: [
        {
          required: true,
          message: "请输入经度",
          trigger: "blur",
        },
      ],
      latitude: [
        {
          required: true,
          message: "请输入纬度",
          trigger: "blur",
        },
      ],
    });

    let dialogFormType = "";
    const dialogEditor = ref(false);

    //创建数组
    var addrs = new Array(37);
    //数组包含了全部，
    // #region
    addrs[0] = new Array(
      "江苏省",
      "南京",
      "常熟",
      "常州",
      "海门",
      "淮安",
      "江都",
      "江阴",
      "昆山",
      "连云港",
      "南通",
      "启东",
      "沭阳",
      "宿迁",
      "苏州",
      "太仓",
      "泰州",
      "同里",
      "无锡",
      "徐州",
      "盐城",
      "宜兴",
      "仪征",
      "张家港",
      "镇江",
      "周庄"
    );
    addrs[1] = new Array(
      "安徽省",
      "合肥",
      "安庆",
      "蚌埠",
      "亳州",
      "巢湖",
      "滁州",
      "阜阳",
      "贵池",
      "淮北",
      "淮南",
      "黄山",
      "九华山",
      "六安",
      "马鞍山",
      "宿州",
      "铜陵",
      "屯溪",
      "芜湖",
      "宣城"
    );
    addrs[2] = new Array("山东省", "青岛", "济南", "日照");
    addrs[3] = new Array(
      "北京市",
      "东城区",
      "西城区",
      "崇文区",
      "宣武区",
      "朝阳区",
      "丰台区",
      "石景山区",
      "海淀区",
      "门头沟区",
      "房山区",
      "通州区",
      "顺义区",
      "昌平区",
      "大兴区",
      "怀柔区",
      "平谷区"
    );
    addrs[4] = new Array(
      "上海",
      "黄浦区",
      "卢湾区",
      "徐汇区",
      "长宁区",
      "静安区",
      "普陀区",
      "闸北区",
      "虹口区",
      "杨浦区",
      "闵行区",
      "宝山区",
      "嘉定区",
      "浦东新区",
      "金山区",
      "松江区",
      "青浦区",
      "南汇区",
      "奉贤区"
    );
    addrs[5] = new Array(
      "天津",
      "和平区",
      "河东区",
      "河西区",
      "南开区",
      "河北区",
      "红桥区",
      "塘沽区",
      "汉沽区",
      "大港区",
      "东丽区",
      "西青区",
      "津南区",
      "北辰区",
      "武清区",
      "宝坻区"
    );
    addrs[6] = new Array(
      "重庆",
      "万州区",
      "涪陵区",
      "渝中区",
      "大渡口区",
      "江北区",
      "沙坪坝区",
      "九龙坡区",
      "南岸区",
      "北碚区",
      "万盛区",
      "双桥区",
      "渝北区",
      "巴南区",
      "黔江区",
      "长寿区",
      "江津市",
      "合川市",
      "永川市",
      "南川市"
    );
    addrs[7] = new Array(
      "四川",
      "成都市",
      "自贡市",
      "攀枝花市",
      "泸州市",
      "德阳市",
      "绵阳市",
      "广元市",
      "遂宁市",
      "内江市",
      "乐山市",
      "南充市",
      "宜宾市",
      "广安市",
      "达州市",
      "眉山市",
      "雅安市",
      "巴中市",
      "资阳市"
    );
    addrs[8] = new Array(
      "广东",
      "广州",
      "深圳",
      "珠海",
      "东莞",
      "中山",
      "佛山",
      "惠州",
      "河源",
      "潮州",
      "江门",
      "揭阳",
      "茂名",
      "梅州",
      "清远",
      "汕头",
      "汕尾",
      "韶关",
      "顺德",
      "阳江",
      "云浮",
      "湛江",
      "肇庆"
    );
    addrs[9] = new Array(
      "浙江",
      "杭州",
      "安吉",
      "慈溪",
      "定海",
      "奉化",
      "海盐",
      "黄岩",
      "湖州",
      "嘉兴",
      "金华",
      "临安",
      "临海",
      "丽水",
      "宁波",
      "瓯海",
      "平湖",
      "千岛湖",
      "衢州",
      "江山",
      "瑞安",
      "绍兴",
      "嵊州",
      "台州",
      "温岭",
      "温州",
      "余姚",
      "舟山"
    );
    addrs[10] = new Array(
      "福建",
      "福州",
      "厦门",
      "泉州",
      "漳州",
      "龙岩",
      "南平",
      "宁德",
      "莆田",
      "三明"
    );
    addrs[11] = new Array(
      "甘肃",
      "兰州",
      "白银",
      "定西",
      "敦煌",
      "甘南",
      "金昌",
      "酒泉",
      "临夏",
      "平凉",
      "天水",
      "武都",
      "武威",
      "西峰",
      "张掖"
    );
    addrs[12] = new Array(
      "广西",
      "南宁",
      "百色",
      "北海",
      "桂林",
      "防城港",
      "贵港",
      "河池",
      "贺州",
      "柳州",
      "钦州",
      "梧州",
      "玉林"
    );
    addrs[13] = new Array(
      "贵州",
      "贵阳",
      "安顺",
      "毕节",
      "都匀",
      "凯里",
      "六盘水",
      "铜仁",
      "兴义",
      "玉屏",
      "遵义"
    );
    addrs[14] = new Array(
      "海南",
      "海口",
      "儋县",
      "陵水",
      "琼海",
      "三亚",
      "通什",
      "万宁"
    );
    addrs[15] = new Array(
      "河北",
      "石家庄",
      "保定",
      "北戴河",
      "沧州",
      "承德",
      "丰润",
      "邯郸",
      "衡水",
      "廊坊",
      "南戴河",
      "秦皇岛",
      "唐山",
      "新城",
      "邢台",
      "张家口"
    );
    addrs[16] = new Array(
      "黑龙江",
      "哈尔滨",
      "北安",
      "大庆",
      "大兴安岭",
      "鹤岗",
      "黑河",
      "佳木斯",
      "鸡西",
      "牡丹江",
      "齐齐哈尔",
      "七台河",
      "双鸭山",
      "绥化",
      "伊春"
    );
    addrs[17] = new Array(
      "河南",
      "郑州",
      "安阳",
      "鹤壁",
      "潢川",
      "焦作",
      "济源",
      "开封",
      "漯河",
      "洛阳",
      "南阳",
      "平顶山",
      "濮阳",
      "三门峡",
      "商丘",
      "新乡",
      "信阳",
      "许昌",
      "周口",
      "驻马店"
    );
    addrs[18] = new Array(
      "湖北",
      "武汉",
      "恩施",
      "鄂州",
      "黄冈",
      "黄石",
      "荆门",
      "荆州",
      "潜江",
      "十堰",
      "随州",
      "武穴",
      "仙桃",
      "咸宁",
      "襄阳",
      "襄樊",
      "孝感",
      "宜昌"
    );
    addrs[19] = new Array(
      "湖南",
      "长沙",
      "常德",
      "郴州",
      "衡阳",
      "怀化",
      "吉首",
      "娄底",
      "邵阳",
      "湘潭",
      "益阳",
      "岳阳",
      "永州",
      "张家界",
      "株洲"
    );
    addrs[20] = new Array(
      "江西",
      "南昌",
      "抚州",
      "赣州",
      "吉安",
      "景德镇",
      "井冈山",
      "九江",
      "庐山",
      "萍乡",
      "上饶",
      "新余",
      "宜春",
      "鹰潭"
    );
    addrs[21] = new Array(
      "吉林",
      "长春",
      "吉林",
      "白城",
      "白山",
      "珲春",
      "辽源",
      "梅河",
      "四平",
      "松原",
      "通化",
      "延吉"
    );
    addrs[22] = new Array(
      "辽宁",
      "沈阳",
      "鞍山",
      "本溪",
      "朝阳",
      "大连",
      "丹东",
      "抚顺",
      "阜新",
      "葫芦岛",
      "锦州",
      "辽阳",
      "盘锦",
      "铁岭",
      "营口"
    );
    addrs[23] = new Array(
      "内蒙古",
      "呼和浩特",
      "阿拉善盟",
      "包头",
      "赤峰",
      "东胜",
      "海拉尔",
      "集宁",
      "临河",
      "通辽",
      "乌海",
      "乌兰浩特",
      "锡林浩特"
    );
    addrs[24] = new Array("宁夏", "银川", "固源", "石嘴山", "吴忠");
    addrs[25] = new Array(
      "青海",
      "西宁",
      "德令哈",
      "格尔木",
      "共和",
      "海东",
      "海晏",
      "玛沁",
      "同仁",
      "玉树"
    );
    addrs[26] = new Array(
      "山东",
      "济南",
      "滨州",
      "兖州",
      "德州",
      "东营",
      "菏泽",
      "济宁",
      "莱芜",
      "聊城",
      "临沂",
      "蓬莱",
      "青岛",
      "曲阜",
      "日照",
      "泰安",
      "潍坊",
      "威海",
      "烟台",
      "枣庄",
      "淄博"
    );
    addrs[27] = new Array(
      "山西",
      "太原",
      "长治",
      "大同",
      "侯马",
      "晋城",
      "离石",
      "临汾",
      "宁武",
      "朔州",
      "沂州",
      "阳泉",
      "榆次",
      "运城"
    );
    addrs[28] = new Array(
      "陕西",
      "西安",
      "安康",
      "宝鸡",
      "汉中",
      "渭南",
      "商州",
      "绥德",
      "铜川",
      "咸阳",
      "延安",
      "榆林"
    );
    addrs[29] = new Array(
      "四川",
      "成都",
      "巴中",
      "达川",
      "德阳",
      "都江堰",
      "峨眉山",
      "涪陵",
      "广安",
      "广元",
      "九寨沟",
      "康定",
      "乐山",
      "泸州",
      "马尔康",
      "绵阳",
      "眉山",
      "南充",
      "内江",
      "攀枝花",
      "遂宁",
      "汶川",
      "西昌",
      "雅安",
      "宜宾",
      "自贡",
      "资阳"
    );
    addrs[30] = new Array(
      "天津",
      "天津",
      "和平",
      "东丽",
      "河东",
      "西青",
      "河西",
      "津南",
      "南开",
      "北辰",
      "河北",
      "武清",
      "红桥",
      "塘沽",
      "汉沽",
      "大港",
      "宁河",
      "静海",
      "宝坻",
      "蓟县"
    );
    addrs[31] = new Array(
      "新疆",
      "乌鲁木齐",
      "阿克苏",
      "阿勒泰",
      "阿图什",
      "博乐",
      "昌吉",
      "东山",
      "哈密",
      "和田",
      "喀什",
      "克拉玛依",
      "库车",
      "库尔勒",
      "奎屯",
      "石河子",
      "塔城",
      "吐鲁番",
      "伊宁"
    );
    addrs[32] = new Array(
      "西藏",
      "拉萨",
      "阿里",
      "昌都",
      "林芝",
      "那曲",
      "日喀则",
      "山南"
    );
    addrs[33] = new Array(
      "云南",
      "昆明",
      "大理",
      "保山",
      "楚雄",
      "东川",
      "个旧",
      "景洪",
      "开远",
      "临沧",
      "丽江",
      "六库",
      "潞西",
      "曲靖",
      "思茅",
      "文山",
      "西双版纳",
      "玉溪",
      "中甸",
      "昭通"
    );
    addrs[34] = new Array("中国香港", "中国香港", "九龙", "新界");
    addrs[35] = new Array("中国澳门", "中国澳门");
    addrs[36] = new Array(
      "中国台湾",
      "台北",
      "基隆",
      "台南",
      "台中",
      "高雄",
      "屏东",
      "南投",
      "云林",
      "新竹",
      "彰化",
      "苗栗",
      "嘉义",
      "花莲",
      "桃园",
      "宜兰",
      "台东",
      "金门",
      "马祖",
      "澎湖"
    );
    // #endregion

    let provinceData = [];
    let cityData = reactive([]);
    for (var i = 0; i < addrs.length; i++) {
      provinceData.push({
        name: addrs[i][0],
        index: i,
      });
    }
    function getCityDropDown(index) {
      for (var i = 1; i < addrs[index].length; i++) {
        cityData.push(addrs[index][i]);
      }
    }
    watch(
      () => FormData.values.provinceIndex,
      () => {
        FormData.values.province = addrs[FormData.values.provinceIndex][0];
        getCityDropDown(FormData.values.provinceIndex);
      },
      { deep: true }
    );

    async function getData() {
      var params = {
        departmentId: departmentId.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      };
      let res = await getBaseInfoApi(params);
      if (res.code == 200) {
        total.value = Number(res.data.total);
        tableList.length = 0;
        tableList.push(...res.data.baseList);
      }
    }
    const handleSizeChange = () => {
      getData();
    };
    const handleCurrentChange = () => {
      getData();
    };
    const handleDepartmentId = (id, name) => {
      departmentId.value = id;
      selectDivision.value = name;
      getData();
    };

    function showDetail(type, row) {
      dialogEditor.value = true;
      if (type == "editor") {
        console.log("row", row);
        disabledDivisionDropDown.value = true;
        dialogFormType = "editor";
        FormData.values.baseId = row.id;
        FormData.values.address = row.detailedAddress;
        FormData.values.area = row.area;
        FormData.values.baseName = row.baseName;
        FormData.values.city = row.city;
        FormData.values.code = row.code;
        FormData.values.departmentId = row.departmentId;
        FormData.values.latitude = row.latitude;
        FormData.values.longitude = row.longitude;
        FormData.values.province = row.province;
        FormData.values.userId = row.userId;
        FormData.values.introduction = row.introduction;
        FormData.values.scale = row.scale;
      } else {
        dialogFormType = "add";
        Object.keys(FormData.values).forEach((key) => {
          FormData.values[key] = "";
        });
      }
    }

    function dataDelete(row) {
      ElMessageBox.confirm("是否删除", {
        customClass: "confirmBox",
        autofocus: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "confirmBtn",
        cancelButtonClass: "cancelBtn",
        center: true,
        showClose: false,
      })
        .then(async () => {
          if (row.shedNumber > 0) {
            ElMessage({
              type: "error",
              message: "提示：该基地下还存在有车间/棚，无法删除！",
            });
          } else {
            console.log(row.id);
            let res = await deleteBaseByIdApi({ baseId: row.id });
            console.log(res);
            if (res.code == 200) {
              getData();
              ElMessage({
                type: "success",
                message: "删除成功",
              });
            }
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }

    async function onSubmit() {
      console.log("submit!", FormData.values);
      if (
        FormData.values.baseName !== "" &&
        FormData.values.userId !== "" &&
        FormData.values.area !== "" &&
        FormData.values.province !== "" &&
        FormData.values.city !== "" &&
        FormData.values.address !== "" &&
        FormData.values.longitude !== "" &&
        FormData.values.latitude !== ""
      ) {
        if (dialogFormType == "editor") {
          let res = await editBaseInfoApi(FormData.values);
          console.log(res);
          if (res.code == 200) {
            ElMessage({
              type: "success",
              message: res.message,
            });
            getData();
            dialogEditor.value = false;
          } else {
            ElMessage({
              type: "error",
              message: res.message,
            });
          }
        } else {
          console.log(FormData.values);
          let res = await addBaseInfoApi(FormData.values);
          console.log(res);
          if (res.code == 200) {
            ElMessage({
              type: "success",
              message: "添加成功！",
            });
            getData();
            dialogEditor.value = false;
          } else {
            ElMessage({
              type: "error",
              message: res.message,
            });
          }
        }
      } else {
        ElMessage({
          type: "error",
          message: "请按需求填写",
        });
      }
    }

    async function getDropDown() {
      let res = await getDivisionDropDownApi();
      divisionDropDownData.push(...res.data.departments);
      let res2 = await getShedDropDownApi();
      userDropDownData.push(...res2.data.userList);
    }

    function getlongitude(value) {
      FormData.values.longitude = value;
    }
    function getlatitude(value) {
      FormData.values.latitude = value;
    }

    return {
      selectDivision,
      disabledDivisionDropDown,
      total,
      currentPage,
      pageSize,
      divisionDropDownData,
      userDropDownData,
      tableList,
      FormData,
      rules,
      dialogEditor,
      provinceData,
      cityData,
      handleSizeChange,
      handleCurrentChange,
      handleDepartmentId,
      showDetail,
      dataDelete,
      onSubmit,
      getlongitude,
      getlatitude,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 30px;
}
.header button {
  width: 100px;
  height: 40px;
}

/* 按钮样式 */
/* #region */
.control-btn {
  margin: 0 auto;
}
.control-btn button {
  width: 80px;
  height: 35px;
  line-height: 33px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
.control-btn button:hover {
  transition: all 0.3s;
}
/* #endregion */
/* 编辑弹出框样式 */
/* #region */
:deep .dialogEditor {
  width: 1100px;
  border: 1px solid rgb(14, 14, 14);
  border-radius: 10px;
}
:deep .el-dialog__body {
  margin: 0 25px 25px;
  padding: 0;
  height: 500px;
}
.baseInfo {
  float: left;
  width: 370px;
}
.otherInfo {
  float: right;
  padding: 0 20px;
  width: 650px;
  height: 500px;
  border-left: 2px solid rgb(138, 138, 138);

  .introduction {
    width: 100%;
    height: 50%;
  }
  .mapChoose {
    width: 100%;
    height: 50%;
    .map-title {
      border-top: 2px solid rgb(138, 138, 138);
      padding-top: 13px;
      margin-right: 30px;
      height: 20%;
    }
    .map {
      float: left;
      width: 50%;
      height: 80%;
    }
    .mapForm {
      float: right;
      padding: 20px;
      width: 50%;
      height: 80%;
    }
  }
}
/* #endregion */
.pagination {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}
</style>
<style>
/* 删除确认框样式 */
/* #region */
.confirmBox {
  width: 300px;
}
.confirmBtn {
  background-color: #409eff;
}
.confirmBtn:hover {
  background-color: #79bbff;
}
/* #endregion */
</style>
