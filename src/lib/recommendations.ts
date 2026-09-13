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
    title: "下楼完成一次日光远眺",
    detail: "离开屏幕，走楼梯或坐电梯到一楼室外。在日光里站满三到五分钟，眼睛看向最远处的树或楼角，再原路走回座位。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 8,
  },
  {
    id: "snack",
    title: "准备并慢慢吃完一份加餐",
    detail: "选水果、坚果或酸奶，先洗手再拿到座位以外的地方。每一口都嚼完再吞，吃完这份再回去工作，中途不看消息。",
    durationMin: 8,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "window",
    title: "在窗边做一次完整的风景观察",
    detail: "走到窗边站稳。先看近处的框与玻璃，再看中景的树或路，最后看最远的天际。每一层看大约一分钟，不拍照。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "stretch",
    title: "做一套从头到脚的起身伸展",
    detail: "站离椅子。双手上举三次，慢慢转肩、转腕，再轻轻侧弯左右。最后把重心在两脚间移动几次，再坐下。",
    durationMin: 7,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "breath",
    title: "做八轮吸停呼的完整呼吸",
    detail: "坐直或靠墙。吸气四拍，轻轻停一拍，呼气六拍。做满八轮，肩膀在呼气时往下沉。数乱了就从下一轮重新开始。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "corridor",
    title: "在走廊走完来回慢步并停两回",
    detail: "离开工位，沿走廊用比平时慢一半的速度走到底。中途停两次，每次站十秒看远处，再走回来。",
    durationMin: 8,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "tea",
    title: "泡一杯热饮，离屏喝完前半杯",
    detail: "去茶水间泡花茶或倒热水。回到座位先把屏幕扣上，双手捧杯暖手，再把前半杯慢慢喝完。",
    durationMin: 9,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 8,
  },
  {
    id: "shoulders",
    title: "做一套肩颈手腕的放松操",
    detail: "十次缓慢肩绕环，十次手腕绕环，再轻轻按虎口与后颈。左右两边都做完，最后把双臂垂在身侧十秒。",
    durationMin: 7,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "green",
    title: "对一株植物做远近交替观察",
    detail: "选办公室绿植或窗外的树。先看整株的轮廓，再看一片叶子的边缘，再把视线送到它后面的远处，循环三次。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "stairs",
    title: "用均匀节奏走完两层楼梯来回",
    detail: "不用跑步。上一层停在平台呼吸两次，再上第二层；下来同样停一次。回到座位前先在楼梯口站稳再走。",
    durationMin: 10,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 10,
  },
  {
    id: "sun-window",
    title: "在窗边完成一次光照与换气",
    detail: "把窗开一条缝，站到有光的位置。闭眼感受光落在眼皮上半分钟，再睁眼远眺，最后把窗关到原来的位置。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "eyes",
    title: "做一轮离屏护眼：遮光、远眺、再睁开",
    detail: "屏幕暗掉或转开。掌心搓热，轻轻覆在闭上的眼睛上约一分钟；再看向六米外的一点二十秒；最后慢慢睁开眨眼。",
    durationMin: 7,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "water-walk",
    title: "接水绕路一圈，回来喝完一杯",
    detail: "去接满一杯水，故意走远路绕一圈再回来。沿途记下两处平时没注意的细节。回到座位不看屏幕，把这杯水喝完三分之二。",
    durationMin: 8,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "door-laps",
    title: "在门厅走四个来回，每趟换焦点",
    detail: "走到门口或楼层大厅。四个来回分别注意：脚下的地面、远处的出口、空气的温度、自己的步速。走完再回座位。",
    durationMin: 8,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "desk-loop",
    title: "绕桌走一圈，在四个方向各停一次",
    detail: "推开椅子，按前、右、后、左绕自己的桌子走。每到一个方向停下，肩下沉，看那个方向最远的一点，再继续。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "wash-face",
    title: "洗脸并做完面部拍打与放松",
    detail: "用常温水洗脸，再轻轻拍干。用指腹从眉心滑到太阳穴三次，再张嘴松开牙关。照镜子只确认洗干净，不做评价。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "count-sixty",
    title: "用一百步走完一段有停顿的慢走",
    detail: "在平坦安全的过道走。每二十步停一次，让后脚跟完全着地，再继续。走到一百步结束，原路用同样节奏返回。",
    durationMin: 8,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "new-path",
    title: "选新路线去公共区，记下三处细节",
    detail: "去倒水或洗手间时换一条平时少走的通道。回来时在心里说出三件看到的东西：一种颜色、一种声音、一处光。",
    durationMin: 8,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "march-place",
    title: "原地踏步三组，摆臂并调整呼吸",
    detail: "离开椅子。每组踏步二十次，手臂自然前后摆，踏完一组就站稳呼吸三次。做满三组，最后把脚掌放平站十秒。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "take-trash",
    title: "清理桌面并送走杂物，回来复位",
    detail: "从桌上拿走三件用过的东西，送到该去的地方。走回来后把杯子、笔和椅子放回舒服的位置，再坐下来。",
    durationMin: 7,
    kind: "walk",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "step-aside",
    title: "离开座位到过道，靠墙站满一分钟",
    detail: "走到过道里，背轻轻靠墙，双脚分开与肩同宽。看前方固定一点，呼吸放慢一分钟，再走回座位坐下。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "room-end",
    title: "走到空间最远端，观察后再原路返回",
    detail: "选房间或大厅最远的那面墙走过去。到了以后看十秒墙与窗外，转身沿原路走回，步速保持比来时更慢。",
    durationMin: 7,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "doorway-air",
    title: "在门边完成三次换气与远眺",
    detail: "站在能看见外面的门边或玄关。吸一口外面的空气，看远处一次；重复三次。不必出门，完成后再走回来。",
    durationMin: 6,
    kind: "walk",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "curtain-slit",
    title: "拉开光线，在光斑里做闭眼睁眼练习",
    detail: "把窗帘或遮光物拉开一条能照进来的缝。站进光斑：闭眼三十秒感受温度，睁眼看光的边缘，再闭眼三十秒。",
    durationMin: 7,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "hands-in-light",
    title: "让双手前臂轮流晒太阳并活动手指",
    detail: "把前臂放到有日光的桌面或窗台。掌心向上一分钟，再翻转向下；同时缓慢张开握拢手指。两边手臂都做完。",
    durationMin: 7,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "face-the-light",
    title: "面向亮处做一轮闭眼日光休息",
    detail: "把椅子转向最亮的方向，闭眼或半睁。让光落在眼皮与脸颊上一分钟，再慢慢转回原位，睁眼后先看远处再看屏幕。",
    durationMin: 7,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "sit-in-patch",
    title: "坐进光里，不碰屏幕坐满这段时间",
    detail: "把座位挪到光能照到的地方，或换到更亮的椅子。计时坐着，双手放在腿上，可以看窗外，但不打开任何屏幕。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "window-crack",
    title: "开窗换气，完成三次深呼吸并感受风向",
    detail: "把窗开一条窄缝，侧身站在气流里。慢慢吸三次，每次注意风从哪边来、凉还是暖。然后再把窗恢复到安全的开合。",
    durationMin: 7,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "move-shade",
    title: "移开遮挡，在新的光线里重新坐好",
    detail: "把挡光的书、包或屏幕挪开，让桌面亮起来。重新摆正椅子，在新的光线里坐一分钟，先看桌面再看远处。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "brightest-spot",
    title: "站到最亮处，完成转身远眺再回来",
    detail: "在房间里找到最亮的一块地面或窗前。站稳，慢慢转一圈看四周最远的点，停在最舒服的朝向呼吸四次，再走回座位。",
    durationMin: 7,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 6,
  },
  {
    id: "watch-clouds",
    title: "跟踪一朵云，看它如何变形离开",
    detail: "走到能看见天空的地方，选定一朵云。看它的边缘变清晰还是散开，直到它移出原先的位置或你看满五分钟。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "far-dot",
    title: "做三轮远近交替对焦",
    detail: "选二十米外的一个点：楼角、树梢或路灯。看远处二十秒，再看手心二十秒，再看远处。做满三轮，最后眨眨眼结束。",
    durationMin: 6,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "count-colors",
    title: "分区记下眼前的颜色，列成一张清单",
    detail: "把视野分成左、中、右。每一区默数能看到的颜色，至少说出五种。数完后看向最远的一块单色，让眼睛停住。",
    durationMin: 6,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "wall-light",
    title: "观察墙上光斑的边缘如何移动",
    detail: "找一面有光的墙或地面，看亮斑和阴影的交界。过一两分钟再看一次，比较它是扩大、缩小还是只是更模糊。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "quiet-watch",
    title: "在窗边看人来人往，不做评价",
    detail: "站在窗边选一个固定取景。有人走过就看完他离开画面，心里不编故事。看满几个来回，把注意力放在移动本身。",
    durationMin: 7,
    kind: "view",
    best: ["noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "one-object",
    title: "对桌上一件物品做一次细致观察",
    detail: "选杯子、笔或夹子。依次看它的轮廓、磨损、反光和影子，像要把它画下来。看完后闭上眼，回忆刚才的细节。",
    durationMin: 6,
    kind: "view",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "sky-color",
    title: "把天空分成近中远三层来看",
    detail: "先看靠近屋顶或树梢的那一层，再看中间的云或空，最后看最远的底色。每一层看大约一分钟，记住此刻的颜色。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "evening"],
    minGapMin: 6,
  },
  {
    id: "other-window",
    title: "换一扇窗，对比两处风景的不同",
    detail: "先在现在这扇窗看一分钟，再走到另一扇窗。比较远近、明暗和能看见的东西，选一处再多看一会儿，然后走回。",
    durationMin: 8,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "watch-shadow",
    title: "用手和光做一组影子观察",
    detail: "在有光的桌面举起手，看影子的边缘。慢慢张开、握拢、上下移动，观察影子如何跟着变。做完把双手平放，看影子消失。",
    durationMin: 6,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "far-focus",
    title: "完成远眺、近看、闭眼三轮循环",
    detail: "看最远处二十秒，看自己的指尖二十秒，闭眼二十秒。重复三轮。结束后先看房间里的中间距离，再回到屏幕。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "leaf-vein",
    title: "从叶柄看到叶尖，看清一片叶子的结构",
    detail: "选一片真的叶子：盆栽或窗外的树。沿叶柄看到分叉，再看到边缘和叶尖。看完整片，再退后一步看整株。",
    durationMin: 7,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "neck-easy",
    title: "做完颈椎六个方向的缓慢活动",
    detail: "下巴微收。左看、右看、低头、抬头，再向两侧轻轻侧倾。每个方向停留一次呼吸，幅度小，不追求发出响声。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "side-bend",
    title: "站姿左右侧弯，手臂延展做满两组",
    detail: "双脚站稳。右手上举，身体慢慢向左弯，停一次呼吸再起来；换边。整组做两次，起来时头顶向上。",
    durationMin: 7,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "open-chest",
    title: "开胸扩肩，配合三次完整呼吸",
    detail: "双手在身后轻轻交握，或只把肩胛骨往中间靠。胸口向前打开，在这个姿势里做三次深呼吸，再慢慢松开。",
    durationMin: 6,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "ankle-circles",
    title: "活动踝膝髋，坐着做完两侧",
    detail: "坐稳。一只脚画五个圈，再轻轻摆小腿、转动大腿方向；换另一侧。做完后双脚平放，感受脚掌重新踩实。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "heel-lifts",
    title: "提踵三组，组间把脚掌放平休息",
    detail: "扶着椅背或桌沿，慢慢踮起再轻轻放下，每组十二次。组间把脚掌完全放平，摆一摆脚趾。三组结束后站十秒再坐。",
    durationMin: 7,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "arms-up",
    title: "双手上举再侧展，做完一组全身打开",
    detail: "十指交叉翻掌上举，保持三次呼吸；再把双臂向两侧打开。重复两遍，最后双手自然垂下，摇一摇再坐下。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "sit-tall",
    title: "坐姿延展脊柱，保持呼吸八次",
    detail: "坐到椅面前缘，双脚踩实。想象头顶被轻轻向上拉，肩膀远离耳朵。保持这个高度呼吸八次，再靠回椅背。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "leg-out",
    title: "坐姿伸腿拉后侧，左右各做一组",
    detail: "坐着把一条腿伸直、脚尖向上，上身微微前倾，停两次呼吸再收回。换另一条腿。做完后把双脚平放摇一摇脚踝。",
    durationMin: 7,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "shrug-drop",
    title: "肩部上提绕环再放下，做完整组",
    detail: "肩膀抬向耳朵停一拍，向前绕三圈、向后绕三圈，再像放下重物那样落下来。整组重复两次，最后双手垂在身侧。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "unclench-jaw",
    title: "放松牙关、舌头和面部肌肉",
    detail: "让上下牙分开，舌尖轻抵下牙后面。慢慢张嘴再合上三次，再做几次夸张的哈欠。最后用指腹按一按咬肌。",
    durationMin: 6,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "weight-shift",
    title: "站姿左右移重心，再轻轻点地",
    detail: "站直，把重量慢慢移到左脚停三秒，再移到右脚。来回六次后，左右脚轮流轻轻点地，最后两脚平均站稳。",
    durationMin: 6,
    kind: "stretch",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "calf-stand",
    title: "扶稳拉伸小腿，两边做完再走几步",
    detail: "手扶墙或桌沿，后脚在后、脚跟送向地面，停三次呼吸；换边。两边都做完，在原地慢慢走八步再回座位。",
    durationMin: 7,
    kind: "stretch",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "stand-reach",
    title: "站着做完上、下、左、右的伸展",
    detail: "双脚与肩同宽。上举、手摸向小腿方向（幅度舒适即可）、再向左右伸展。四个方向各停一次呼吸，像把身体里的褶皱抚平。",
    durationMin: 7,
    kind: "stretch",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "long-exhale",
    title: "用更长的呼气做完八轮呼吸",
    detail: "用鼻吸到自然满，用嘴把气慢慢吐到空。呼气比吸气更长。做满八轮，最后一轮之后静坐三次自然呼吸。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "nose-mouth",
    title: "鼻吸口呼，完成一组均匀呼吸",
    detail: "闭嘴用鼻子吸，嘴巴呼气时像把蜡烛火苗吹斜而不是吹灭。做八次，让每次的长短尽量接近，肩保持低。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "four-rounds",
    title: "按四拍吸六拍呼做满八个来回",
    detail: "坐直。吸四拍，呼六拍，中间不刻意憋气。做满八个来回。中途走神就从下一轮接着数。",
    durationMin: 7,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "one-sigh",
    title: "用几次长叹过渡，再进入平稳呼吸",
    detail: "先故意长叹三次，让肩膀跟着落下来。然后改成安静的鼻吸鼻呼一分钟。用叹息当开头，用平稳呼吸当收尾。",
    durationMin: 6,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "belly-hand",
    title: "手放腹部，做满一分钟腹式呼吸",
    detail: "一只手轻放小腹，另一只手放胸口。吸气时只让腹上的手轻轻升起，胸口尽量少动。持续大约一分钟，再把手放下。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 5,
  },
  {
    id: "soft-hum",
    title: "闭唇轻哼，让胸口振动完整数息",
    detail: "吸一口气，闭着嘴轻轻哼出，声音小到只有自己听见。哼完再吸。做六到八次，注意胸口和鼻腔的振动，然后安静坐一会儿。",
    durationMin: 7,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "count-ten",
    title: "用呼吸从十数到一，再倒回来",
    detail: "每一次呼气减一个数，从十到一；再从一呼到十。如果中途忘了，从十重新来一遍，不要责备自己。",
    durationMin: 7,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "pause-empty",
    title: "呼气后短暂停，做完一组再收功",
    detail: "自然吸，慢慢呼尽，在空的那一下只停一拍就吸回来，不要憋到难受。做六次后改回普通呼吸，坐十秒再睁眼。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "listen-breath",
    title: "闭眼听自己的呼吸直到计时结束",
    detail: "看向地面或闭眼。不改变呼吸，只听空气进出鼻腔的声音。听到走神就回到声音上，直到这段休息结束。",
    durationMin: 6,
    kind: "breath",
    best: ["morning", "evening"],
    minGapMin: 5,
  },
  {
    id: "finger-fan",
    title: "张开握拢、指尖对压，再垂手休息",
    detail: "十指尽量张开停两秒，再握成松拳；做十次。然后左右指尖对压十秒。最后双手垂在身侧，感受血流回到指尖。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "palm-rub",
    title: "搓热双手覆眼，再搓到手心发暖",
    detail: "掌心相对搓热，轻轻覆在闭着的眼睛上不施压，停留大约三十秒。拿开后再搓热一次，把温度留在手心，放回腿上。",
    durationMin: 6,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "press-tips",
    title: "逐根按压并轻轻拉伸每一指",
    detail: "用另一只手的拇指，从拇指按到小指，每指按三圈再轻轻向手背方向拉。换手做完。全部结束后握拳再完全松开。",
    durationMin: 7,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "shake-out",
    title: "甩手转腕，再让手臂自然垂下",
    detail: "手腕放松，在身体两侧轻轻甩十五秒；再让手腕慢慢画圈各八次。然后双臂完全垂下二十秒，什么也不抓。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "hands-on-lap",
    title: "双手放腿上，从手指扫描到肩膀",
    detail: "掌心向下放在大腿上。依次注意指尖、手掌、手腕、小臂、肘、肩。每一处停留一次呼吸，整条手臂都扫描完。",
    durationMin: 6,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "press-palm",
    title: "揉手心与虎口，双手轮流做完",
    detail: "拇指在手心打圈二十秒，再轻轻按虎口。换另一只手。力度像揉一块温热的布，做完后双手十指交叉再松开。",
    durationMin: 6,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "thumb-circles",
    title: "大拇指绕环并对指，完成两侧",
    detail: "四指放松，大拇指正反各画八圈；再让拇指依次点食指到小指。换手。做完把双手摊开放在桌上。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "drop-the-pen",
    title: "放下工具，做手部反向张开练习",
    detail: "把笔和鼠标都离开手。用力张开十指像推开一面墙，停五秒再松开；重复六次。让屈曲了一上午的手走到相反方向。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "clasp-release",
    title: "交握拉伸前臂，再完全松开",
    detail: "十指交叉翻掌轻轻前推，停两次呼吸；再举过头顶一次。然后突然全部松开，让手落在腿上，感受松开后的重量。",
    durationMin: 6,
    kind: "hands",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "desk-press",
    title: "按桌等长发力，再彻底放松",
    detail: "双手按住桌面往下送五秒，肩不要耸起；松开五秒。重复六次。最后一次松开后，把双手翻过来掌心向上休息。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "finger-waves",
    title: "依次抬指如弹琴，左右手做完",
    detail: "手掌贴桌，从拇指到小指一根一根抬起再放下，来回两遍；换手。做完后双手同时轻轻敲桌沿八下，再停住。",
    durationMin: 6,
    kind: "hands",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "hold-still",
    title: "双手交叠静放，配合缓慢呼吸",
    detail: "一只手叠在另一只手上，放在腿上或桌上。不玩手指。随着呼吸数八次，注意力如果跑去工作，就回到手的温度上。",
    durationMin: 7,
    kind: "hands",
    best: ["evening"],
    minGapMin: 6,
  },
  {
    id: "warm-sips",
    title: "倒一杯温水，分多次离屏喝完",
    detail: "给自己倒满一杯温水。屏幕翻过去或离开视线，每喝一口都停下感受温度，直到这杯见底或至少喝完大半。",
    durationMin: 8,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "fruit-chew",
    title: "准备一份水果，细嚼慢咽吃完",
    detail: "选苹果、香蕉或橘子，洗净后拿到座位以外。每一口多嚼几次，把甜味留在嘴里，把这一份吃完再回去。",
    durationMin: 8,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 7,
  },
  {
    id: "refill-third",
    title: "续满水杯，不看屏幕喝完三分之一",
    detail: "先把杯子加到满。计时或凭感觉，在不看屏幕的情况下喝掉大约三分之一，把杯子放回原处，再决定要不要继续喝。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "cool-sips",
    title: "慢慢喝完半杯白开水",
    detail: "倒半杯常温或微凉的白开水。一口一口喝完，中间至少停三次。把喝完这半杯当成这段休息的完整事件。",
    durationMin: 7,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "wash-and-eat",
    title: "洗净一份水果或点心再吃完",
    detail: "去水槽认真洗干净水果或拿出点心。走回来坐下，不看手机，把这一份吃完。洗手、准备和吃，都算在休息里。",
    durationMin: 9,
    kind: "snack",
    best: ["morning", "noon"],
    minGapMin: 8,
  },
  {
    id: "one-sip-notice",
    title: "用半杯水做一次品尝温度的练习",
    detail: "倒半杯水。第一口只注意凉热，第二口注意嘴里的触感，第三口注意咽下去的路径。把半杯按这样喝完。",
    durationMin: 6,
    kind: "snack",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "plain-bite",
    title: "准备一口清淡点心，坐下来吃完",
    detail: "选饼干、面包或白煮蛋，只拿一份。离开键盘坐下，把这一份慢慢吃完，不边吃边回消息。吃完再收拾包装。",
    durationMin: 7,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "rinse-clear",
    title: "洗手漱口，再喝一口水回到座位",
    detail: "到水池用清水洗手、漱口。吐掉以后再喝一口干净的水，感觉口腔空了，再走回座位坐下。",
    durationMin: 6,
    kind: "snack",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "hold-warm-cup",
    title: "双手捧杯暖手，再喝完前半杯",
    detail: "倒温水或热茶。先用掌心贴着杯壁暖手一分钟，再开始喝。不看屏幕，把前半杯喝完，后半杯留着回去再喝也行。",
    durationMin: 7,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 6,
  },
  {
    id: "wait-right-temp",
    title: "等热水到适口，完成闻香与第一口",
    detail: "倒上热水后不要去刷手机。看蒸汽变少，闻一闻，试温度，刚好入口时再喝第一口，并接着喝完三四口。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 7,
  },
  {
    id: "plain-kettle",
    title: "去茶水间接水往返，喝完第一杯的一半",
    detail: "什么茶都不加，只接白开水。走去走回当作散步。回到座位先喝完一半，把杯子放在手边，这一段才算结束。",
    durationMin: 8,
    kind: "tea",
    best: ["morning", "afternoon"],
    minGapMin: 7,
  },
  {
    id: "smell-steam",
    title: "先观色闻香，再小口喝完几口",
    detail: "把杯子拿到眼前看水色，再凑近闻热气，然后才喝。至少认真喝三小口，每一口之间把杯子放下。",
    durationMin: 6,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
  {
    id: "watch-the-cup",
    title: "看水面从热到温，再把这杯喝掉一半",
    detail: "杯子放在眼前，看蒸汽变少、水面平静。等到不再烫，开始喝，直到大约一半。中途不打开屏幕。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 7,
  },
  {
    id: "sip-no-phone",
    title: "屏幕翻过去，把这杯热饮喝完",
    detail: "手机和电脑都转到看不见的角度。双手捧杯，把这一杯从第一口喝到见底或剩下一口。喝完再让屏幕回来。",
    durationMin: 8,
    kind: "tea",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 7,
  },
  {
    id: "rinse-the-cup",
    title: "洗干净杯子，重新倒上温水喝几口",
    detail: "先把杯子里外冲净，擦干或控干。再倒少量温水，站着或坐着喝完这几口。清洗的动作也算休息的一部分。",
    durationMin: 7,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 6,
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
