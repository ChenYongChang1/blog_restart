/*
 * @Author: Alex yu
 * @LastEditors: Alex yu
 * @Date: 2020-06-17 12:25:19
 * @LastEditTime: 2020-06-22 11:46:27
 */

import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import {
  Container,
  Header,
  Footer,
  Main,
  Loading,
  Message,
  MessageBox,
  Notification,
  Tooltip,
  Badge,
  Button,
  ButtonGroup,
  Row,
  Col,
  Input,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Dialog,
  Autocomplete,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Rate,
  Icon,
  Progress,
  Table,
  TableColumn,
  DatePicker,
  Pagination,
  Tabs,
  TabPane,
  Select,
  Option,
  Timeline,
  TimelineItem,
  Popover,
  RadioButton,
  RadioGroup,
  Image,
  Switch,
  Checkbox,
  Cascader,
  Form,
  FormItem,
  Link,
  CheckboxGroup,
  Avatar,
  Step,
  Steps,
  Card,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Collapse,
  CollapseItem
} from 'element-ui'
import '@/assets/css/element-variables.scss'

Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.use(Step)
Vue.use(Steps)
Vue.use(Avatar)
Vue.use(Link)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Option)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Tooltip)
Vue.use(Badge)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Rate)
Vue.use(Icon)
Vue.use(Progress)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Cascader)
Vue.use(Card)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
