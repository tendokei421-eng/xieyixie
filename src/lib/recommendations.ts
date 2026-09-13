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
    title: "下楼去偷一会儿太阳",
    detail: "离开座位到楼下亮处站三五分钟。把脸和眼睛借给太阳，再走回来。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 7,
  },
  {
    id: "snack",
    title: "给自己发一份好吃的小奖励",
    detail: "水果、坚果或酸奶，选一样就行。慢慢吃，谁也不许在旁边催你。",
    durationMin: 6,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window",
    title: "把窗外那场戏看完",
    detail: "走到窗边。云、树、路过的人都是演员。不拍照，看到想笑或想停再回来。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stretch",
    title: "站起来，把懒腰伸成一条线",
    detail: "双手往上够，再轻轻晃晃肩。像刚睡醒那样，把身体拉开一点。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "breath",
    title: "偷偷打一个很豪华的哈欠",
    detail: "张大，吸满，再慢慢呼出去。肩膀跟着掉下来。豪华哈欠可以打两次。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "corridor",
    title: "在走廊里用慢镜头走一圈",
    detail: "步子放慢到有点好笑。数四十步回来，像电影里的慢动作。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "tea",
    title: "去泡杯热的，假装在咖啡馆",
    detail: "等水开的时间就是休息。喝的时候不看手机，假装窗外有街景。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 7,
  },
  {
    id: "shoulders",
    title: "手腕肩膀跳一支十秒舞",
    detail: "肩绕几圈，手腕绕几圈，再把手指抖一抖。短、轻、有点傻，刚刚好。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "green",
    title: "去找一片最绿的叶子打招呼",
    detail: "绿萝、行道树或窗台上的菜都可以。看它一眼，在心里说：你真绿。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "stairs",
    title: "走两层楼，当自己在爬山",
    detail: "不用跑。用舒服的节奏上下两层，假装山顶有风，其实是楼道。",
    durationMin: 10,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 8,
  },
  {
    id: "sun-window",
    title: "把窗边那块光占为己有",
    detail: "来不及下楼也行。站到光里，让风和亮从下午中间切一刀。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "eyes",
    title: "给眼睛放一个五分钟假",
    detail: "掌心轻轻盖在闭上的眼睛上。给它们一间小小的黑屋子，再慢慢睁开。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "water-walk",
    title: "去接水，走成一条小游行",
    detail: "杯子是道具。去的时候不看手机，回来把步子走出一点节奏。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "door-laps",
    title: "门口来回两趟，像去串门",
    detail: "走到门口，点一下头，再走回来。再来一次。很近的旅行也算旅行。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "desk-loop",
    title: "绕桌子走一圈，第二圈更懒",
    detail: "椅子推开。第一圈看看四周，第二圈走得更慢，像巡视自己的小岛。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "wash-face",
    title: "去拍把凉水，把脸叫醒",
    detail: "常温或微凉都行。拍干以后不照镜子挑毛病，只觉得脸上清清爽爽。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "count-sixty",
    title: "数六十步，走得像散步的鸭子",
    detail: "平坦的地方慢慢走。步子可以有一点点左右晃。数到六十就停，不要跑。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "new-path",
    title: "倒水时专走那条没走过的路",
    detail: "换一侧通道或绕一个弯。让眼睛看到平时错过的角落，像开了新地图。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "march-place",
    title: "原地踏步，步子小得可笑",
    detail: "脚只离开地面一点点。像在走隐形的人行道。感到腿暖了就收工。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "take-trash",
    title: "扔垃圾，路上顺便去探险",
    detail: "顺手带走一两件用过的东西。送到该去的地方，回来时看看有没有新发现。",
    durationMin: 5,
    kind: "walk",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "step-aside",
    title: "离开椅子两步，假装旅行了",
    detail: "站起来，只走两步远。来回几趟。短途旅行，立刻往返。",
    durationMin: 4,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "room-end",
    title: "走到房间尽头，打个来回",
    detail: "选最远的那面墙。走到那里停三秒，像抵达站台，再原路返回。",
    durationMin: 5,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "doorway-air",
    title: "门边站一会儿，闻闻外面",
    detail: "不必出门。站在能看见外面的门边，吸一口不一样的空气。",
    durationMin: 5,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "curtain-slit",
    title: "把窗帘拉开一条偷偷看的缝",
    detail: "只拉开一点点。让一束光溜进来，你站在光里眨眨眼。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-in-light",
    title: "用手去捧一小把阳光",
    detail: "掌心向上，伸进有光的地方。暖了就收回来，像装走了一小块下午。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 3,
  },
  {
    id: "face-the-light",
    title: "把脸凑过去，让光停一分钟",
    detail: "闭眼或半睁。让光落在眼皮上，像给脸盖了一块亮毯子。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "sit-in-patch",
    title: "坐进光里，当三分钟沙滩椅",
    detail: "把椅子挪到光斑里。什么都不处理，只坐着发光。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window-crack",
    title: "开条窗缝，请风进来坐坐",
    detail: "开一条窄缝。先感觉温度，再轻轻吸一口，请它在房间里转一圈。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "move-shade",
    title: "把挡光的东西请到一边",
    detail: "书、袋子或屏幕如果挡住了亮，挪开一点。座位亮了，人也松一点。",
    durationMin: 4,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "brightest-spot",
    title: "去房间最亮的地方站一小会儿",
    detail: "找到最亮的那一块地板或窗边。站稳，看光怎么铺开。",
    durationMin: 5,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 4,
  },
  {
    id: "watch-clouds",
    title: "给天上那朵云起个外号",
    detail: "走到能看见天空的地方。看它像兔子、像船、还是像一块棉花糖。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "far-dot",
    title: "和远处一个点对视二十秒",
    detail: "楼角、树梢或路灯都行。看二十秒，再看近处，再看远处。谁先眨眼谁请喝水。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "count-colors",
    title: "找齐红黄蓝，像在玩寻宝",
    detail: "扫一眼四周。三种颜色都找到就赢了。多找到的算奖励关。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "wall-light",
    title: "看墙上的光斑会不会搬家",
    detail: "盯着那块亮。它是清晰、发虚，还是正悄悄往旁边挪。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "quiet-watch",
    title: "看窗外默片，不配音",
    detail: "有人走过就看一眼。不编故事，不评价，只看画面自己动。",
    durationMin: 5,
    kind: "view",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "one-object",
    title: "把桌上的杯子当成博物馆展品",
    detail: "看边缘、影子和磨损。像第一次见到它，忍不住想笑它那么普通。",
    durationMin: 4,
    kind: "view",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sky-color",
    title: "抬头看天，记住今天的天空色号",
    detail: "蓝、灰或傍晚的橘都算。看十秒，装进脑子里，再低下头。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "other-window",
    title: "换一扇窗，看下一集",
    detail: "如果有另一扇窗，走过去。换个角度，风景就更新一集。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "watch-shadow",
    title: "用手变一个影子小动物",
    detail: "兔子、小狗或不明飞行物都可以。演完三秒就收工，当一场迷你戏。",
    durationMin: 4,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "far-focus",
    title: "让眼睛去最远的地方度假",
    detail: "看视野里最远的那一块。轻轻看过去，眼周的肌肉放假。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "leaf-vein",
    title: "盯一片叶子，看纹路像不像地图",
    detail: "窗外的树或身边的盆栽都行。找到一条主路，再找一条小路。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "neck-easy",
    title: "脖子慢慢说一遍：不——是——哦",
    detail: "轻轻左转像说不，右转像说是，点头像说哦。幅度小，不要较劲。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "side-bend",
    title: "向一边倒，像被风吹的树",
    detail: "站稳或坐稳。一侧手臂上举，身体慢慢倒向另一边。左右都吹一下。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "open-chest",
    title: "把胸口打开，请空气进来坐",
    detail: "肩胛骨轻轻往后靠，肩膀往下掉。像把门打开，让气自己走进来。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "ankle-circles",
    title: "脚踝在空中画一个笑脸",
    detail: "一只脚离地，画圈当眼睛，再换一只。画得圆不圆都算可爱。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "heel-lifts",
    title: "轻轻踮脚，当迷你爆米花",
    detail: "慢慢踮起，再轻轻放下。做十几次，小腿会有一点开心的热。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "arms-up",
    title: "举手摆一个超级英雄造型",
    detail: "十指交叉翻掌向上，伸直。停三次呼吸。你可以很严肃，也可以偷偷笑。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "sit-tall",
    title: "坐得像在公园长椅上吹风",
    detail: "坐到椅子前一点，头顶向上，肩膀放下。假装面前有湖，其实没有。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "leg-out",
    title: "腿伸直，假装踢了两下小水花",
    detail: "坐着把脚尖勾起，伸直再收回。换边。水花是假的，舒服是真的。",
    durationMin: 4,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shrug-drop",
    title: "耸肩，把肩上的小石头抖掉",
    detail: "肩抬向耳朵，停一拍，再像放下背包那样落下来。石头是想象的，肩是真的松。",
    durationMin: 3,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "unclench-jaw",
    title: "让下巴去度个三十秒假",
    detail: "上下牙分开一点，舌头放松。下巴什么都不用咬，只放假。",
    durationMin: 3,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "weight-shift",
    title: "左右换脚，像在听一首很慢的歌",
    detail: "站着把重量慢慢移过去，再移回来。没有音乐也没关系，你就是节拍。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "calf-stand",
    title: "扶着桌子，让小腿后侧伸个懒腰",
    detail: "一只脚在后，后脚跟往地面送一送。换边。拉开就停，不要弹跳。",
    durationMin: 5,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stand-reach",
    title: "假装高处有块饼干，伸手去够",
    detail: "站直，向斜上方伸。够到了就换边。饼干可以是假的，伸展是真的。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "long-exhale",
    title: "把气吹进一个看不见的气球",
    detail: "慢慢把气吐完，再自然吸进来。气球在想象里变大，肩在现实里变低。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "nose-mouth",
    title: "像护着烛火那样轻轻吹气",
    detail: "鼻子吸，嘴巴呼。气只把看不见的火苗吹斜，不要吹灭。做六次。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "four-rounds",
    title: "做四个懒洋洋的深呼吸",
    detail: "吸四拍，呼六拍。只做四个来回。数乱了就笑一下，再来。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "one-sigh",
    title: "叹一口世界上最舒服的气",
    detail: "故意叹一次，越叹越松。气走了，肩膀也跟着下班。",
    durationMin: 3,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "belly-hand",
    title: "看肚子像小青蛙一样起伏",
    detail: "一只手轻放在腹部。吸气鼓起，呼气落下。看一分钟这部迷你纪录片。",
    durationMin: 5,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 4,
  },
  {
    id: "soft-hum",
    title: "闭着嘴哼一句只有自己会的歌",
    detail: "声音小到隔壁听不见。哼一句广告、儿歌或乱编的调。让胸口轻轻振。",
    durationMin: 4,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "count-ten",
    title: "呼气倒数，用脑子里的滑稽声音",
    detail: "每一次呼气减一。可以用很怪的内心配音。数到一就谢幕。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "pause-empty",
    title: "呼完停一拍，像漫画里的静音框",
    detail: "不要憋得难受。空那一下停一拍，再轻轻吸进来。像翻到下一格。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "listen-breath",
    title: "把呼吸当成迷你广播听完",
    detail: "闭上眼或看地面。不改造它，只听进出的声音。一集很短，一两分钟。",
    durationMin: 4,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 3,
  },
  {
    id: "finger-fan",
    title: "手指张开，打一个无声的星形招呼",
    detail: "十指张开停一拍，再轻轻握拢。做十次。像星星在手心里亮灭。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "palm-rub",
    title: "两手搓热，给脸烤两个小饼",
    detail: "掌心搓热，轻轻覆在眼睛或脸颊上。不施压，只借那一点暖。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-tips",
    title: "给每根手指点一次名",
    detail: "用拇指从对面的拇指按到小指。换手。点到谁，谁就可以歇一下。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "shake-out",
    title: "把手指上的星星渣甩干净",
    detail: "手腕放松，在身体两侧轻轻甩。像甩掉水珠或亮晶晶的碎屑。十秒够了。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hands-on-lap",
    title: "双手放腿上，宣布下班四分钟",
    detail: "掌心向下，什么也不抓。手的重量交给腿，谁也不许来派任务。",
    durationMin: 4,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "press-palm",
    title: "在手心画一颗歪歪的心",
    detail: "拇指在手心轻轻打圈。画得不像也没关系，另一只手再画一颗。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "thumb-circles",
    title: "大拇指绕地球一圈",
    detail: "其余手指放假。大拇指正转一圈、反转一圈。当微型环球旅行。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "drop-the-pen",
    title: "把笔放下，让它也歇一会儿",
    detail: "笔和鼠标都离开手。十指空着放桌上。人和文具同时放假一分钟。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "clasp-release",
    title: "握一下再松开，像放掉一只气球",
    detail: "十指交叉握几秒，再全部松开，手落在腿上。感受松开后的轻。",
    durationMin: 3,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "desk-press",
    title: "把多余的力气还给桌子",
    detail: "掌心按住桌面送两秒，再放开。桌子很稳，它接得住。",
    durationMin: 3,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "finger-waves",
    title: "手指轮流从桌上探头问好",
    detail: "手掌贴桌，从拇指到小指一根根抬起。像五个小人排队露面。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 3,
  },
  {
    id: "hold-still",
    title: "双手叠好，当三十秒可爱雕塑",
    detail: "一只手叠在另一只手上。不玩手指，只摆着。时间一到就活过来。",
    durationMin: 5,
    kind: "hands",
    best: ["evening"],
    minGapMin: 4,
  },
  {
    id: "warm-sips",
    title: "喝温水，假装是冬天的热可可",
    detail: "小口喝，每口停一下。杯子里其实是水，演出可以很投入。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "fruit-chew",
    title: "吃水果，当三十秒美食评论家",
    detail: "每口多嚼几次。甜、脆还是香，在心里打个分，分数可以很好笑。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 5,
  },
  {
    id: "refill-third",
    title: "续满水，像品茶一样喝三分之一",
    detail: "先把杯子加满。不看屏幕，喝到大约三分之一处，郑重放下。",
    durationMin: 5,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "cool-sips",
    title: "喝凉白开，当通关奖励",
    detail: "常温或微凉即可。一口一口喝完这半杯，像过关后的补给。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "wash-and-eat",
    title: "去洗一颗水果，完成甜蜜任务",
    detail: "认真洗干净，走回来再吃。洗手和吃，都算这次休息的剧情。",
    durationMin: 7,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "one-sip-notice",
    title: "喝一口，猜它是温的还是凉的",
    detail: "含一秒再咽。猜对了就赢，猜错了也赢，因为你喝到水了。",
    durationMin: 4,
    kind: "snack",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "plain-bite",
    title: "吃一口点心，就地开迷你野餐",
    detail: "饼干、面包都可以。只吃一小口，把座位临时变成草地。",
    durationMin: 5,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "rinse-clear",
    title: "漱一口水，嘴巴重启成功",
    detail: "到水池用清水漱一下。吐掉，感觉口腔空了一点，像刷新了页面。",
    durationMin: 4,
    kind: "snack",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "hold-warm-cup",
    title: "把杯子当暖手宝抱住",
    detail: "温水或热茶都行。掌心贴着杯壁，先暖手，再喝，两件事都算数。",
    durationMin: 5,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "wait-right-temp",
    title: "看热水变温，这部戏很短",
    detail: "倒上就不要去刷手机。等它刚好入口，第一口才是开场。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "plain-kettle",
    title: "去茶水间旅行，只倒白开水",
    detail: "什么茶都不加。走去走回就是景点，白开水是伴手礼。",
    durationMin: 6,
    kind: "tea",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "smell-steam",
    title: "先闻热气，再喝第一口",
    detail: "杯子凑近。先打招呼，再喝。像对待一杯专门为你准备的东西。",
    durationMin: 3,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "watch-the-cup",
    title: "盯着杯面，等波纹走完",
    detail: "看蒸汽变少，看水面重新平静。等它不再烫，再喝，像等演职员表。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "sip-no-phone",
    title: "屏幕翻过去，只和这杯待着",
    detail: "手机扣上。这几口热水是你现在唯一的同伴，喝完再回到人间。",
    durationMin: 5,
    kind: "tea",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "rinse-the-cup",
    title: "把杯子洗亮，再倒一点温的",
    detail: "里外冲净。再倒少量温水。清洗的动作本身就很好玩，也让手停下来。",
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
