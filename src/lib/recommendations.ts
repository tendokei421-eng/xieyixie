import type {
  CalendarEvent,
  Gap,
  RestActivity,
  RestLog,
  TimeOfDay,
} from "./types";
import { minutesOf, timeOfDay as slotOf } from "./dates";

export const ACTIVITIES: RestActivity[] = [
  {
    id: "sun-walk",
    title: "下楼晒一会儿太阳",
    detail: "到楼下亮处站三到五分钟。眼睛看远处，再走回座位。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 7,
  },
  {
    id: "snack",
    title: "给自己留一份小零食",
    detail: "水果、坚果或酸奶，选一样慢慢吃完。这几分钟不看消息。",
    durationMin: 6,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window",
    title: "到窗边看一会儿",
    detail: "找一朵云、一棵树，或街上经过的人。看一会儿再离开，不用拍照。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stretch",
    title: "起身伸个懒腰",
    detail: "双手向上拉一拉，再轻轻转肩。把坐了很久的身体打开一点。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "breath",
    title: "做几次不着急的呼吸",
    detail: "吸气四拍，呼气再长一点。做八次，肩膀会跟着松下来。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "corridor",
    title: "在走廊里把步子放慢",
    detail: "不用走远。离开座位，慢慢走一圈，数四十步再回来。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "tea",
    title: "去泡一杯热的",
    detail: "等水开的时间也算休息。喝的时候先把手机放下。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 7,
  },
  {
    id: "shoulders",
    title: "转转手腕和肩膀",
    detail: "肩绕十圈，手腕绕十圈，再轻轻按一按虎口。打字久了最需要这个。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "green",
    title: "看一处绿色",
    detail: "盆栽、窗外的树都可以。让眼睛从近处的屏幕里退出来。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "stairs",
    title: "不急地走两层楼梯",
    detail: "不用跑。用舒适的节奏上下两层，回来时脑子会清楚一点。",
    durationMin: 10,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 8,
  },
  {
    id: "sun-window",
    title: "站到有光的窗边",
    detail: "来不及下楼也行。开一点窗，让风和光线进来。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "eyes",
    title: "让眼睛离开屏幕五分钟",
    detail: "掌心轻轻覆在闭上的眼睛上，不施压。待一会儿再慢慢睁开。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "water-walk",
    title: "去接一杯水，慢慢走回来",
    detail: "把接水当成一次短短的离开。去的路上不看手机。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "door-laps",
    title: "到门口走两个来回",
    detail: "不必出大门。走到门口再走回来，重复一次，让腿活动开。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "desk-loop",
    title: "绕着桌子慢慢走一圈",
    detail: "把椅子推开一点。围着自己的桌子走一圈，手可以自然摆动。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "wash-face",
    title: "去洗把脸",
    detail: "用常温或微凉的水。拍干以后只感觉清爽，不用对着镜子待太久。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "count-sixty",
    title: "把步子放慢，数满六十步",
    detail: "在平坦的地方走。每一步都比平时慢一点，数到六十再停。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "new-path",
    title: "倒水时换一条少走的路",
    detail: "选另一侧通道或绕一个弯。换条路，眼睛也会换个景。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "march-place",
    title: "原地轻轻踏步一会儿",
    detail: "脚不必抬高。交替离开地面，感到腿部微微发热就可以停。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "take-trash",
    title: "把垃圾带走，顺便走动一下",
    detail: "收拾桌上一两件用过的东西送到该去的地方。来回这一趟就够。",
    durationMin: 5,
    kind: "walk",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "step-aside",
    title: "离开座位，到过道上走几步",
    detail: "站起来，离开椅子两步远。来回走几趟，不用去很远。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "room-end",
    title: "走到房间另一头再回来",
    detail: "选最远的那面墙。走到那里停三秒，再原路返回。",
    durationMin: 5,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "doorway-air",
    title: "到能看见外面的门边站一会儿",
    detail: "不必出门。站在门边或玄关，看外面的光，再走回来。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "curtain-slit",
    title: "把窗帘拉开一点",
    detail: "只开一条缝也行。让光进来，在那道光里站一会儿。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-in-light",
    title: "把手放到有阳光的地方",
    detail: "掌心向上，停在光里。等手背暖起来，再收回来。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 3,
  },
  {
    id: "face-the-light",
    title: "把脸转向亮处",
    detail: "闭眼或半睁。让光落在眼皮上大约一分钟，再转回来。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "sit-in-patch",
    title: "坐到光线能照到的地方",
    detail: "把椅子挪进光里，或换一个更亮的位置。坐满三分钟，先不处理消息。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window-crack",
    title: "开一条窗缝，让风进来",
    detail: "开窄一点就好。先感觉空气的温度，再轻轻吸一口气。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "move-shade",
    title: "把挡住光的东西挪开",
    detail: "书、包或屏幕如果挡着亮，移开一些。座位亮一点，人也松一点。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "brightest-spot",
    title: "站到房间里最亮的地方",
    detail: "找最亮的一块地板或窗边。站稳，看光落在哪里。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "watch-clouds",
    title: "看一会儿天上的云",
    detail: "走到能看见天空的地方。看一朵云的形状有没有慢慢变。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "far-dot",
    title: "看远处一个点，看满二十秒",
    detail: "楼角、树梢或路灯都可以。看二十秒，再看近处，再看回远处。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "count-colors",
    title: "数一数眼前有哪些颜色",
    detail: "从左到右看一圈，默数能看见的颜色。数完就停。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "wall-light",
    title: "看光在墙上怎么移动",
    detail: "找一面有光的墙或地面。看亮斑的边缘是清晰还是发虚。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "quiet-watch",
    title: "看窗外经过的人",
    detail: "站在窗边看一眼路过的人。不评价，把注意力放在移动本身。",
    durationMin: 5,
    kind: "view",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "one-object",
    title: "重新看一眼桌上的一件东西",
    detail: "杯子、笔或一个夹子。看它的边缘、影子和磨损，当几分钟的休息。",
    durationMin: 4,
    kind: "view",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sky-color",
    title: "抬头看一眼现在的天色",
    detail: "蓝、灰或傍晚的暖色都算。看十秒，记住，再低下头。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "other-window",
    title: "换一扇窗，看更远一点",
    detail: "如果有另一扇窗，走过去。换个角度，风景会不一样。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "watch-shadow",
    title: "看自己或桌上的影子",
    detail: "动一下手，看影子怎么跟着。看一两分钟就够。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "far-focus",
    title: "把视线放到最远处",
    detail: "找视野里最远的那一块。轻轻看过去，让近处用久的眼睛歇一歇。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "leaf-vein",
    title: "看一片叶子的纹路",
    detail: "窗外的树或身边的盆栽都行。看叶脉怎么分开，不用认出它的名字。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "neck-easy",
    title: "轻轻转转脖子",
    detail: "向左看，向右看，再慢慢低下再抬起。幅度小一些，不要用力。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "side-bend",
    title: "向两侧慢慢侧弯",
    detail: "站稳或坐稳。一侧手臂上举，身体轻轻倒向另一侧。左右各几次。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "open-chest",
    title: "打开胸口，肩往下沉",
    detail: "双手在身后轻轻交握，或只把肩胛骨往一起靠。呼吸会顺一点。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "ankle-circles",
    title: "脚踝慢慢画圈",
    detail: "一只脚离开地面，画五个圈，再换另一只。坐下或扶着桌子都可以。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "heel-lifts",
    title: "轻轻抬起脚后跟再放下",
    detail: "站直，慢慢踮起，再轻轻放下。做十几次即可。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "arms-up",
    title: "双手交叉举过头顶",
    detail: "十指交叉，翻掌向上，轻轻伸直。保持三次呼吸，再把手放下。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sit-tall",
    title: "坐直，后背离开椅背",
    detail: "坐到椅子前缘一点。头顶向上，肩膀放下，保持大约一分钟。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "leg-out",
    title: "把一条腿伸直，再慢慢收回",
    detail: "坐着即可。脚尖向上，伸直停两秒再收回。换另一条腿。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shrug-drop",
    title: "耸肩，再慢慢放下",
    detail: "肩膀抬向耳朵，停一拍，再落下来。重复六次。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "unclench-jaw",
    title: "松开咬紧的牙",
    detail: "让上下牙分开一点，舌头放松。保持半分钟。",
    durationMin: 3,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "weight-shift",
    title: "把重心从左脚换到右脚",
    detail: "站着，慢慢把重量移到一只脚，再移到另一只。来回几次。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "calf-stand",
    title: "扶着桌子，轻轻拉伸小腿",
    detail: "一只脚在后，后脚跟往地面送。换边。感觉拉开就停，不要弹。",
    durationMin: 5,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stand-reach",
    title: "站起来，向两侧伸展",
    detail: "双脚与肩同宽。一只手向斜上方伸，再换边。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "long-exhale",
    title: "慢慢呼出一口长气",
    detail: "用嘴把气轻轻吐完，再自然吸进来。做五次，呼气比吸气更长。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "nose-mouth",
    title: "鼻子吸气，嘴巴轻轻呼",
    detail: "闭嘴鼻吸。呼气时气要轻。重复六次。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "four-rounds",
    title: "把呼吸放慢，数四个来回",
    detail: "吸四拍，呼六拍。只做四个来回。数乱了就重新开始。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "one-sigh",
    title: "叹一口气，让肩膀跟着下来",
    detail: "故意叹一次。气走了，肩膀也跟着落，再自然呼吸几次。",
    durationMin: 3,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "belly-hand",
    title: "把手放在肚子上，感受起伏",
    detail: "一只手轻放在腹部。吸气时手被轻轻顶起，呼气时落回去。看一分钟。",
    durationMin: 5,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 4,
  },
  {
    id: "soft-hum",
    title: "闭着嘴，轻轻哼几声",
    detail: "声音小到只有自己听见。哼一段会的旋律，或只哼一个长音。",
    durationMin: 4,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "count-ten",
    title: "随着呼气，从十数到一",
    detail: "每一次呼气减一个数。数到一就停。走神了，从十再来一次。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "pause-empty",
    title: "呼完气，停一小下再吸",
    detail: "不要憋得难受。只在空的那一下停一拍，再轻轻吸进来。做六次。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "listen-breath",
    title: "只听自己的呼吸",
    detail: "闭上眼或看地面。不改变它，只听空气进出。一两分钟即可。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "finger-fan",
    title: "十指张开，再轻轻握拢",
    detail: "完全张开，停一拍，再慢慢握成松松的拳。做十次，力度要轻。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "palm-rub",
    title: "两掌对搓，直到温热",
    detail: "掌心相对来回搓。热了以后可以轻轻覆在眼睛上，不施压。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-tips",
    title: "轻轻按一按每一根指尖",
    detail: "用另一只手的拇指，从拇指按到小指，再换手。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shake-out",
    title: "轻轻甩甩双手",
    detail: "手腕放松，在身体两侧轻轻甩开。大约十秒。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-on-lap",
    title: "把双手平放在大腿上",
    detail: "掌心向下，手指自然伸开。什么也不抓，让手的重量被腿接住。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-palm",
    title: "用拇指按一按手心",
    detail: "在手心中央轻轻打圈。酸胀就换边，不必用力。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "thumb-circles",
    title: "慢慢转转大拇指",
    detail: "其余四指放松。大拇指画正圈，再画反圈，换一只手。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "drop-the-pen",
    title: "把笔放下，让手指空着",
    detail: "笔和鼠标都离开手。十指自然放在桌上，空一分钟再拿回来。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "clasp-release",
    title: "双手交握，再完全松开",
    detail: "十指交叉握几秒，再松开，让手落在腿上。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "desk-press",
    title: "双手按在桌面上，再松开",
    detail: "掌心按住桌面，轻轻向下送，停两秒再放开。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "finger-waves",
    title: "让手指依次轻轻抬起",
    detail: "手掌贴桌。从拇指到小指，一根一根抬起再放下。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hold-still",
    title: "双手交叠，安静放一会儿",
    detail: "一只手叠在另一只手上，放在腿上或桌上。不玩手指，只放着。",
    durationMin: 5,
    kind: "hands",
    best: ["evening"],
    minGapMin: 4,
  },
  {
    id: "warm-sips",
    title: "给自己倒一杯温水，小口喝",
    detail: "不要一口气灌完。每喝一口停一下，感觉水从喉咙下去。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "fruit-chew",
    title: "吃一片水果，细细嚼",
    detail: "苹果、香蕉或橘子都可以。每口多嚼几次，把味道留在嘴里。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 5,
  },
  {
    id: "refill-third",
    title: "把水杯续满，喝掉三分之一",
    detail: "先把杯子加满。喝的时候不看屏幕，喝到大约三分之一处就放下。",
    durationMin: 5,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "cool-sips",
    title: "倒半杯凉白开，慢慢喝完",
    detail: "常温或微凉即可。一口一口喝完这半杯。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "wash-and-eat",
    title: "洗一颗水果，再吃掉它",
    detail: "去水槽洗干净，走回来再吃。洗和吃都算这段休息。",
    durationMin: 7,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "one-sip-notice",
    title: "喝一口水，只注意温度",
    detail: "含在嘴里一秒。热、温还是凉，感觉到了再咽。",
    durationMin: 4,
    kind: "snack",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "plain-bite",
    title: "吃一口清淡的点心，慢慢咽",
    detail: "饼干或面包都可以。只吃一小口，不要边吃边做事。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "rinse-clear",
    title: "去漱一口水",
    detail: "到水池用清水漱口。吐掉以后再走回来。",
    durationMin: 4,
    kind: "snack",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "hold-warm-cup",
    title: "用双手捧着杯子",
    detail: "杯里是温水或热茶都好。掌心贴着杯壁，先暖手，再喝。",
    durationMin: 5,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "wait-right-temp",
    title: "倒一点热水，等它变得刚好",
    detail: "倒上先不要去看手机。等它刚好入口，再喝第一口。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "plain-kettle",
    title: "去茶水间倒一杯白开水",
    detail: "这次什么都不加。走去走回，本身就是歇一口气。",
    durationMin: 6,
    kind: "tea",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "smell-steam",
    title: "凑近杯子，先闻一闻再喝",
    detail: "还没喝。先感觉热气，再喝第一口。",
    durationMin: 3,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "watch-the-cup",
    title: "看杯子里的水从热变温",
    detail: "看蒸汽变少，看水面平静下来。等它不再烫，再喝。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "sip-no-phone",
    title: "捧着杯子，喝的时候不看屏幕",
    detail: "把屏幕转到看不见的角度。这几口喝完，再回到事情上。",
    durationMin: 5,
    kind: "tea",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "rinse-the-cup",
    title: "把杯子洗干净，再倒一点温水",
    detail: "先把杯子里外冲净。再倒少量温水，喝几口。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  }
];

export function mergeBusy(events: CalendarEvent[]): Array<{ start: number; end: number }> {
  const sorted = [...events]
    .map((e) => ({ start: minutesOf(e.start), end: minutesOf(e.end) }))
    .filter((e) => e.end > e.start)
    .sort((a, b) => a.start - b.start);

  const merged: Array<{ start: number; end: number }> = [];
  for (const cur of sorted) {
    const last = merged[merged.length - 1];
    if (!last || cur.start > last.end) merged.push({ ...cur });
    else last.end = Math.max(last.end, cur.end);
  }
  return merged;
}

export function findGaps(
  events: CalendarEvent[],
  workStart = "08:00",
  workEnd = "19:00",
): Gap[] {
  if (events.length === 0) return [];
  const start = minutesOf(workStart);
  const end = minutesOf(workEnd);
  const busy = mergeBusy(events);
  const gaps: Gap[] = [];
  const toHHmm = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

  let cursor = start;
  for (const b of busy) {
    if (b.start > cursor) {
      const minutes = b.start - cursor;
      if (minutes >= 5) {
        gaps.push({ start: toHHmm(cursor), end: toHHmm(b.start), minutes });
      }
    }
    cursor = Math.max(cursor, b.end);
  }
  if (end > cursor) {
    const minutes = end - cursor;
    if (minutes >= 5) {
      gaps.push({ start: toHHmm(cursor), end: toHHmm(end), minutes });
    }
  }
  return gaps;
}

export function currentOrNextGap(gaps: Gap[], nowHHmm: string): Gap | null {
  const now = minutesOf(nowHHmm);
  const current = gaps.find((g) => minutesOf(g.start) <= now && now < minutesOf(g.end));
  if (current) return current;
  return gaps.find((g) => minutesOf(g.start) >= now) ?? null;
}

export function isNowInEvent(events: CalendarEvent[], nowHHmm: string) {
  const now = minutesOf(nowHHmm);
  return events.some((e) => minutesOf(e.start) <= now && now < minutesOf(e.end));
}

function scoreActivity(
  a: RestActivity,
  ctx: {
    tod: TimeOfDay;
    gapMin: number;
    doneIds: string[];
  },
) {
  let s = 10;
  if (a.best.includes(ctx.tod)) s += 8;
  if (a.durationMin <= ctx.gapMin) s += 6;
  else s -= Math.min(12, a.durationMin - ctx.gapMin);
  if (a.minGapMin > ctx.gapMin) s -= 20;
  if (ctx.doneIds.includes(a.id)) s -= 7;
  return s;
}

export function recommendActivities(opts: {
  nowHHmm: string;
  gap: Gap | null;
  restLogs: RestLog[];
  limit?: number;
}): RestActivity[] {
  const tod = slotOf(opts.nowHHmm);
  const gapMin = opts.gap?.minutes ?? 20;
  const doneIds = opts.restLogs.filter((l) => l.completed).map((l) => l.activityId);
  return [...ACTIVITIES]
    .map((a) => ({
      a,
      s: scoreActivity(a, { tod, gapMin, doneIds }),
    }))
    .sort((x, y) => y.s - x.s || x.a.id.localeCompare(y.a.id))
    .slice(0, opts.limit ?? 3)
    .map((x) => x.a);
}

export function pickActivityPage(
  ranked: RestActivity[],
  page: number,
  size = 3,
): RestActivity[] {
  if (ranked.length === 0) return [];
  if (ranked.length <= size) {
    const start = ((page % ranked.length) + ranked.length) % ranked.length;
    return ranked.map((_, i) => ranked[(start + i) % ranked.length]);
  }
  const pages = Math.ceil(ranked.length / size);
  const p = ((page % pages) + pages) % pages;
  return ranked.slice(p * size, p * size + size);
}

export function activityById(id: string) {
  return ACTIVITIES.find((a) => a.id === id);
}

export function kindLabel(kind: RestActivity["kind"]) {
  switch (kind) {
    case "sun":
      return "日光";
    case "snack":
      return "小食";
    case "view":
      return "风景";
    case "stretch":
      return "伸展";
    case "breath":
      return "呼吸";
    case "walk":
      return "走动";
    case "tea":
      return "茶歇";
    case "hands":
      return "放松";
  }
}
