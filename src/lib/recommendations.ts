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
    title: "走出工位，下楼晒晒太阳",
    detail: "离开屏幕，坐电梯或走楼梯到楼下。站在日光里三到五分钟，让眼睛看向远处。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 8,
  },
  {
    id: "snack",
    title: "奖励自己一份健康小零食",
    detail: "坚果、水果或酸奶都可以。慢慢吃，把注意力放回身体，而不是下一封邮件。",
    durationMin: 6,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window",
    title: "看看窗外，欣赏一处风景",
    detail: "走到窗边，找一朵云、一棵树或路过的人。不拍照，不评价，只看一会儿。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stretch",
    title: "起身伸个懒腰",
    detail: "双手向上延展，再轻轻转肩、转转手腕。让坐了太久的脊柱重新打开。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "breath",
    title: "闭眼，做一组深呼吸",
    detail: "坐直或靠墙。吸气四拍，停一拍，呼气六拍。重复八次，让肩膀慢慢松开。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "corridor",
    title: "在走廊里慢慢走一圈",
    detail: "不必去很远。离开工位，把步子放慢，数四十步再回来。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "tea",
    title: "泡一杯温热的花茶",
    detail: "去茶水间，等水开的时间就是休息。喝的时候不看手机。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 8,
  },
  {
    id: "shoulders",
    title: "转转手腕和肩膀",
    detail: "十次肩绕环，十次手腕绕环，再轻轻按一按虎口。专为久坐打字的人准备。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "green",
    title: "远眺一株绿色植物",
    detail: "办公室的绿萝、窗外的行道树都可以。让睫状肌从近距离对焦里松开。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "stairs",
    title: "到楼梯间走两层",
    detail: "不用跑步。用舒适的节奏上下两层，回来时会有一点温热，脑子更清楚。",
    durationMin: 10,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 10,
  },
  {
    id: "sun-window",
    title: "站到有阳光的窗边一会儿",
    detail: "如果来不及下楼，开一扇窗也很好。让风和光线切进下午的节奏。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "eyes",
    title: "让眼睛离开屏幕五分钟",
    detail: "用掌心轻轻覆在闭上的眼睛上，不施压。感受黑暗和温度，再慢慢睁开。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "water-walk",
    title: "去接一杯水，慢慢走回来",
    detail: "把接水当成一次短短的散步。去的时候不看手机，回来的路上把步子放慢。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "door-laps",
    title: "到门口来回走两趟",
    detail: "不必出大门。走到门口，转身走回座位，再重复一次。让膝盖重新活动。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "desk-loop",
    title: "围着桌子缓缓走一圈",
    detail: "椅子推开一点。绕着自己的桌子慢慢走一圈，手可以轻轻摆动。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "wash-face",
    title: "去洗把脸，让水醒一醒",
    detail: "用常温或微凉的水洗脸。拍干的时候不照镜子评价自己，只感觉皮肤清爽。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "count-sixty",
    title: "把步子放慢，数满六十步",
    detail: "在安全、平坦的地方走。每一步都数出来，数到六十再停。比平时更慢一些。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "new-path",
    title: "换一条少走的路去倒水",
    detail: "去倒水时选另一条通道或另一侧。新的路线会让眼睛看到平时忽略的角落。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "march-place",
    title: "原地轻轻踏步一会儿",
    detail: "不必抬得很高。脚掌交替离开地面，像走路那样自然。感到腿部微微发热就停。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "take-trash",
    title: "把垃圾带走，顺便走动一下",
    detail: "收拾桌上一两件用过的东西，送到该去的地方。来回这一趟就是休息。",
    durationMin: 5,
    kind: "walk",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "step-aside",
    title: "离开座位，到过道上走几步",
    detail: "站起来，离开椅子两步远。来回走几趟就够，不用去很远。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "room-end",
    title: "走到房间另一头再走回来",
    detail: "选房间或大厅最远的那一面墙。走到那里停三秒，再原路返回。",
    durationMin: 5,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "doorway-air",
    title: "到能看见外面的门边站一会儿",
    detail: "不必出门。站在门边或玄关，看外面的光和空气，再走回来。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "curtain-slit",
    title: "把窗帘拉开一条缝",
    detail: "只拉开一点点也行。让一束光进来，站在那道光里眨眨眼。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-in-light",
    title: "把手伸进日光里暖一暖",
    detail: "掌心向上，放到有光的地方。感受温度从手指慢慢上来，不必做什么。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 3,
  },
  {
    id: "face-the-light",
    title: "把脸转向有光的方向",
    detail: "闭眼或半睁。让光落在眼皮上大约一分钟，再慢慢转回来。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "sit-in-patch",
    title: "坐到光线能照到的地方",
    detail: "把椅子挪到光斑里，或换一个更亮的座位。坐满三分钟，不处理消息。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window-crack",
    title: "开一条窗缝，让风进来",
    detail: "把窗开一条窄缝。先感觉空气的温度，再轻轻吸一口气。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "move-shade",
    title: "把挡光的东西移开一点",
    detail: "书、袋子或屏幕如果挡住了光，挪开一些。让座位亮一点，人也会松一点。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "brightest-spot",
    title: "站到最亮的那块地方",
    detail: "在房间里找最亮的一处，站稳。看光如何落在地板或桌面上。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "watch-clouds",
    title: "看一看天上的云",
    detail: "走到能看见天空的地方。找一朵云，看它的形状变不变，不给它起名字。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "far-dot",
    title: "盯着远处一个点看一会儿",
    detail: "选二十米开外的一个点：楼角、树梢或路灯。看满二十秒，再看近处，再看远处。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "count-colors",
    title: "数一数眼前有几种颜色",
    detail: "不走动也可以。从左到右扫一眼，默数能看到的颜色。数完就停。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "wall-light",
    title: "看光在墙上怎么走动",
    detail: "找一面有光的墙或地面。看亮斑的边缘，看它是清晰还是发虚。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "quiet-watch",
    title: "看窗外路过的人，只看不评",
    detail: "站在窗边。有人走过就看一眼，心里不编故事。把注意力放在移动本身。",
    durationMin: 5,
    kind: "view",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "one-object",
    title: "重新看一眼桌上的一件小东西",
    detail: "选杯子、笔或一枚夹子。看它的边缘、影子和磨损。像第一次见到那样。",
    durationMin: 4,
    kind: "view",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sky-color",
    title: "抬头看天，记住此刻的颜色",
    detail: "蓝色、灰色或傍晚的暖色都可以。看十秒，在心里记住，再低下头。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "other-window",
    title: "换一扇窗，看更远的地方",
    detail: "如果房间有另一扇窗，走过去。换一个角度，风景就会不一样。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "watch-shadow",
    title: "看自己或桌上的影子",
    detail: "动手或点头，看影子怎么跟着。像看一个安静的默片，几分钟就够。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "far-focus",
    title: "尽量往远处看，让眼睛松下来",
    detail: "找视野里最远的那一块。不要盯死，轻轻看过去，让眼周的肌肉休息。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "leaf-vein",
    title: "找一片叶子，看它的纹路",
    detail: "窗外的树或身边的盆栽都可以。看叶脉怎么分开，不需要认出它的名字。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "neck-easy",
    title: "轻轻转转脖子",
    detail: "下巴收一点。向左看，向右看，再慢慢低下再抬起。幅度小，不追求响声。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "side-bend",
    title: "向两侧慢慢侧弯",
    detail: "站稳或坐稳。一侧手臂上举，身体轻轻倒向另一侧。左右各做几次就停。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "open-chest",
    title: "打开胸口，肩往下沉",
    detail: "双手在身后轻轻交握，或只把肩胛骨往一起靠。胸口向前打开，呼吸顺一下。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "ankle-circles",
    title: "脚踝慢慢画圈",
    detail: "一只脚离开地面，脚踝画五个圈，再换另一只。坐下或扶着桌子都可以。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "heel-lifts",
    title: "轻轻抬起脚后跟再放下",
    detail: "站直，慢慢踮起，再轻轻放下。做十几次，小腿会有一点温热。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "arms-up",
    title: "双手交叉举过头顶",
    detail: "十指交叉，翻掌向上，轻轻伸直。保持三次呼吸，再把手放下来。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sit-tall",
    title: "坐直，后背离开椅背",
    detail: "坐到椅子前缘一点。头顶向上，肩膀放下。保持一分钟，像有一根线在拉你。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "leg-out",
    title: "把一条腿伸直，再慢慢收回",
    detail: "坐着即可。脚尖向上，腿伸直停两秒，再收回。换另一条腿，各做几次。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shrug-drop",
    title: "耸肩，再轻轻放下",
    detail: "肩膀抬向耳朵，停一拍，再像放下重物那样落下来。重复六次。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "unclench-jaw",
    title: "张开嘴，松开咬紧的牙",
    detail: "让上下牙分开一点。舌头放松，轻轻抵在下牙后面。保持半分钟。",
    durationMin: 3,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "weight-shift",
    title: "把重心从左脚换到右脚",
    detail: "站着，慢慢把重量移到一只脚，再移到另一只。像岸边的草被风推动。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "calf-stand",
    title: "扶着稳固的地方，轻轻拉伸小腿",
    detail: "手扶墙或桌沿，一只脚在后，后脚跟往地面送。换边。感觉拉开就停，不要弹。",
    durationMin: 5,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stand-reach",
    title: "站起来，向两侧伸展",
    detail: "双脚与肩同宽。一只手向右上方伸，换边。像把身体里的褶皱抚平。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "long-exhale",
    title: "慢慢呼出一口长气",
    detail: "用嘴把气轻轻吐完，再自然吸进来。做五次。呼气比吸气更长一点。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "nose-mouth",
    title: "用鼻子吸气，用嘴轻轻呼",
    detail: "闭嘴，鼻吸。嘴呼时像把蜡烛火苗吹斜，但不要吹灭。重复六次。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "four-rounds",
    title: "把呼吸放慢，数四个来回",
    detail: "吸四拍，呼六拍。只做四个来回就结束。数乱了也不要紧，重新开始即可。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "one-sigh",
    title: "叹一口气，让肩膀跟着下来",
    detail: "故意叹一次。气走了，肩膀也跟着落。再自然呼吸几次。",
    durationMin: 3,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "belly-hand",
    title: "把手放在肚子上，感受起伏",
    detail: "一只手轻放在腹部。吸气时手被轻轻顶起，呼气时落回去。看一分钟就够。",
    durationMin: 5,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 4,
  },
  {
    id: "soft-hum",
    title: "闭着嘴，轻轻哼几个音",
    detail: "声音小到只有自己听见。哼一段会的旋律，或只哼一个长音。让胸口振动。",
    durationMin: 4,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "count-ten",
    title: "随着呼气，从十数到一",
    detail: "每一次呼气减一个数。数到一就停。如果走神了，从十再来一次。",
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
    title: "只听自己的呼吸，什么都不做",
    detail: "闭上眼或看地面。不改变呼吸，只听空气进出。一分钟到两分钟即可。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "finger-fan",
    title: "十指张开，再轻轻握拢",
    detail: "像星形那样张开，停一拍，再慢慢握成松松的拳头。做十次，力度要轻。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "palm-rub",
    title: "两掌对搓，直到温热",
    detail: "掌心相对，来回搓。热了以后轻轻覆在眼睛或脸颊上，不施压。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-tips",
    title: "轻轻按一按每一根指尖",
    detail: "用另一只手的拇指，从拇指按到小指。换手。像给手指说一声到了。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shake-out",
    title: "轻轻甩甩双手",
    detail: "手腕放松，手在身体两侧轻轻甩。像甩掉水珠。十秒就够。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-on-lap",
    title: "把双手平放在大腿上",
    detail: "掌心向下，手指自然伸开。什么也不抓。让手的重量被腿接住。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-palm",
    title: "用拇指按一按手心",
    detail: "在手心中央轻轻打圈。酸胀就换边。不必用力，像揉一块温热的布。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "thumb-circles",
    title: "慢慢转转大拇指",
    detail: "其余四指放松。大拇指画正圈、再画反圈。换一只手。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "drop-the-pen",
    title: "把笔放下，让手指空着",
    detail: "笔、鼠标都离开手。十指自然弯曲，放在桌上。空一分钟再拿回来。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "clasp-release",
    title: "双手交握，再完全松开",
    detail: "十指交叉握几秒，再突然全部松开，让手落在腿上。感受松开后的重量。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "desk-press",
    title: "双手按在桌面上，再松开",
    detail: "掌心按住桌面，轻轻向下送，停两秒再放开。像把多余的力气还给桌子。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "finger-waves",
    title: "让手指依次轻轻抬起",
    detail: "手掌贴桌。从拇指到小指，一根一根抬起再放下。像在桌上走一小段阶梯。",
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
    detail: "不要一口气灌完。每喝一口都停一下，感觉水从喉咙下去。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "fruit-chew",
    title: "吃一片水果，细细嚼",
    detail: "苹果、香蕉或橘子都可以。每口多嚼几次，把甜味在嘴里留住。",
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
    detail: "不必冰镇。常温或微凉即可。一口一口喝完这半杯，当作一次暂停。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "wash-and-eat",
    title: "洗一颗水果，再吃掉它",
    detail: "去水槽认真洗干净。走回来再吃。洗手和吃，都是这段休息的一部分。",
    durationMin: 7,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "one-sip-notice",
    title: "喝一口水，只注意温度",
    detail: "含在嘴里一秒。热、温还是凉，说给自己听。再咽下去。",
    durationMin: 4,
    kind: "snack",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "plain-bite",
    title: "吃一口清淡的点心，慢慢咽",
    detail: "饼干、面包或白煮蛋都可以。只吃一小口，把味道吃完，不要边吃边做事。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "rinse-clear",
    title: "去漱一口水，清清口",
    detail: "到水池用清水漱口。吐掉以后，感觉口腔空了一点，再走回来。",
    durationMin: 4,
    kind: "snack",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "hold-warm-cup",
    title: "用双手捧着杯子暖手",
    detail: "杯里是温水或热茶都好。掌心贴着杯壁，先暖手，再喝。",
    durationMin: 5,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "wait-right-temp",
    title: "倒一点热水，等它变得刚好",
    detail: "倒上就不要走开刷手机。看着它从热变温，刚好入口时再喝第一口。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "plain-kettle",
    title: "去茶水间只倒白开水",
    detail: "这次什么茶都不加。白开水走去走回，本身就是歇一口气。",
    durationMin: 6,
    kind: "tea",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "smell-steam",
    title: "凑近杯子，闻一闻热气",
    detail: "还没喝。先闻温度和气味。像对待一杯认真准备的东西。",
    durationMin: 3,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "watch-the-cup",
    title: "看杯子里的水从热变温",
    detail: "把杯子放在眼前。看蒸汽变少，看水面平静下来。等它不再烫，再喝。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "sip-no-phone",
    title: "捧着杯子，喝的时候不看屏幕",
    detail: "屏幕扣过去或离开视线。只和这几口热水在一起，喝完再回到事情上。",
    durationMin: 5,
    kind: "tea",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "rinse-the-cup",
    title: "把杯子洗干净，再倒一点温水",
    detail: "先把杯子里外冲净。再倒少量温水。清洗的动作本身就能让手停下来。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
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
