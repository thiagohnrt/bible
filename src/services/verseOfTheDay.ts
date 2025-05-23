import img01 from "../../public/img/verseOfTheDay/1.jpg";
import img02 from "../../public/img/verseOfTheDay/2.jpg";
import img03 from "../../public/img/verseOfTheDay/3.jpg";
import img04 from "../../public/img/verseOfTheDay/4.jpg";
import img05 from "../../public/img/verseOfTheDay/5.jpg";
import img06 from "../../public/img/verseOfTheDay/6.jpg";
import img07 from "../../public/img/verseOfTheDay/7.jpg";
import img08 from "../../public/img/verseOfTheDay/8.jpg";
import img09 from "../../public/img/verseOfTheDay/9.jpg";
import img10 from "../../public/img/verseOfTheDay/10.jpg";
import img11 from "../../public/img/verseOfTheDay/11.jpg";
import img12 from "../../public/img/verseOfTheDay/12.jpg";
import img13 from "../../public/img/verseOfTheDay/13.jpg";
import img14 from "../../public/img/verseOfTheDay/14.jpg";
import img15 from "../../public/img/verseOfTheDay/15.jpg";
import img16 from "../../public/img/verseOfTheDay/16.jpg";
import img17 from "../../public/img/verseOfTheDay/17.jpg";
import img18 from "../../public/img/verseOfTheDay/18.jpg";
import img19 from "../../public/img/verseOfTheDay/19.jpg";
import img20 from "../../public/img/verseOfTheDay/20.jpg";
import img21 from "../../public/img/verseOfTheDay/21.jpg";
import img22 from "../../public/img/verseOfTheDay/22.jpg";
import img23 from "../../public/img/verseOfTheDay/23.jpg";
import img24 from "../../public/img/verseOfTheDay/24.jpg";
import img25 from "../../public/img/verseOfTheDay/25.jpg";
import img26 from "../../public/img/verseOfTheDay/26.jpg";
import img27 from "../../public/img/verseOfTheDay/27.jpg";
import img28 from "../../public/img/verseOfTheDay/28.jpg";
import img29 from "../../public/img/verseOfTheDay/29.jpg";
import img30 from "../../public/img/verseOfTheDay/30.jpg";
import img31 from "../../public/img/verseOfTheDay/31.jpg";
import img32 from "../../public/img/verseOfTheDay/32.jpg";
import img33 from "../../public/img/verseOfTheDay/33.jpg";
import img34 from "../../public/img/verseOfTheDay/34.jpg";
import { bibleUtils } from "@/lib/bibleUtils";

const images = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
];

const versesOfTheDay = [
  "9:2:2",
  "6:1:9",
  "5:7:9",
  "1:12:1",
  "21:3:1",
  "32:2:2",
  "43:1:1",
  "20:3:5",
  "22:2:4",
  "2:15:2",
  "50:2:3",
  "20:1:7",
  "61:1:3",
  "1:1:27",
  "50:1:6",
  "40:4:4",
  "50:2:5",
  "51:4:2",
  "62:3:1",
  "24:1:5",
  "8:2:12",
  "16:1:5",
  "51:2:6",
  "53:3:3",
  "5:31:6",
  "34:1:7",
  "45:5:1",
  "47:1:3",
  "3:19:2",
  "54:2:5",
  "63:1:6",
  "62:4:4",
  "44:1:8",
  "60:2:9",
  "49:1:3",
  "55:1:7",
  "60:5:7",
  "40:7:7",
  "62:1:9",
  "40:5:9",
  "21:7:8",
  "22:8:6",
  "45:8:1",
  "62:4:7",
  "28:6:3",
  "61:3:9",
  "22:8:7",
  "45:6:4",
  "56:3:5",
  "23:6:8",
  "23:9:6",
  "59:1:5",
  "37:2:9",
  "55:4:7",
  "5:8:18",
  "49:2:8",
  "9:16:7",
  "59:4:7",
  "47:9:7",
  "48:6:9",
  "20:21:1",
  "10:22:2",
  "2:20:12",
  "1:50:20",
  "21:3:11",
  "40:1:23",
  "20:4:23",
  "30:4:13",
  "31:1:15",
  "60:4:10",
  "20:16:3",
  "2:14:14",
  "20:22:6",
  "20:9:10",
  "46:1:10",
  "10:7:22",
  "50:4:13",
  "18:1:21",
  "2:33:14",
  "23:25:1",
  "30:5:14",
  "45:12:2",
  "51:3:23",
  "3:26:12",
  "51:1:16",
  "56:2:11",
  "24:33:3",
  "37:1:13",
  "60:3:15",
  "11:8:23",
  "27:12:3",
  "44:4:12",
  "35:2:14",
  "19:23:1",
  "40:6:33",
  "58:11:1",
  "48:2:20",
  "40:5:16",
  "39:3:10",
  "12:6:16",
  "16:4:14",
  "23:26:3",
  "54:6:10",
  "5:6:4,5",
  "49:2:10",
  "43:3:16",
  "14:7:14",
  "42:1:37",
  "58:12:1",
  "66:3:20",
  "43:4:24",
  "45:3:23",
  "52:5:23",
  "1:28:15",
  "25:3:25",
  "29:2:13",
  "43:14:6",
  "43:15:5",
  "6:24:15",
  "23:53:5",
  "49:3:20",
  "54:6:12",
  "43:8:12",
  "5:30:19",
  "66:21:4",
  "45:10:9",
  "9:15:22",
  "59:4:10",
  "3:25:18",
  "4:23:19",
  "27:3:16",
  "19:27:1",
  "43:8:32",
  "49:6:10",
  "36:3:17",
  "45:6:23",
  "55:3:16",
  "46:3:16",
  "58:4:12",
  "19:46:1",
  "19:91:1",
  "19:19:1",
  "19:18:2",
  "24:17:7",
  "43:6:35",
  "3:19:18",
  "41:8:36",
  "18:5:17",
  "58:13:5",
  "47:12:9",
  "29:2:28",
  "42:6:38",
  "19:32:8",
  "19:37:4",
  "47:5:17",
  "28:14:9",
  "47:4:18",
  "19:56:3",
  "58:13:8",
  "19:34:8",
  "59:3:17",
  "46:6:19",
  "59:5:16",
  "45:8:28",
  "2:20:3,4",
  "20:10:22",
  "10:22:31",
  "43:10:10",
  "21:12:13",
  "23:41:10",
  "41:12:30",
  "20:11:25",
  "20:18:10",
  "20:12:25",
  "20:3:5,6",
  "23:40:31",
  "14:20:15",
  "13:16:11",
  "18:12:10",
  "19:100:3",
  "20:17:22",
  "11:18:21",
  "46:10:13",
  "41:10:27",
  "40:25:40",
  "19:100:4",
  "59:1:2,3",
  "43:11:25",
  "40:28:20",
  "13:28:20",
  "13:29:11",
  "40:10:39",
  "41:16:15",
  "50:4:6,7",
  "45:15:13",
  "19:16:11",
  "58:10:23",
  "66:22:12",
  "43:16:33",
  "43:12:46",
  "42:12:48",
  "43:14:27",
  "19:91:11",
  "40:28:19",
  "66:22:17",
  "26:36:26",
  "18:19:25",
  "19:34:18",
  "44:17:28",
  "19:73:26",
  "46:15:58",
  "23:43:1,2",
  "45:12:1,2",
  "58:12:1,2",
  "19:62:1,2",
  "23:55:6,7",
  "19:139:14",
  "23:55:8,9",
  "42:2:10,11",
  "50:3:13,14",
  "19:121:1,2",
  "42:11:9,10",
  "25:3:22,23",
  "29:2:12,13",
  "48:5:22,23",
  "52:4:16,17",
  "35:3:17,18",
  "19:119:105",
  "45:8:38,39",
  "21:12:13,14",
  "26:11:19,20",
  "4:6:24,25,26",
  "25:3:21,22,23",
  "46:13:4,5,6,7",
  "52:5:16,17,18",
  "47:4:16,17,18",
  "24:29:11,12,13",
  "40:11:28,29,30",
  "40:22:37,38,39",
];

export const getVerseOfTheDay = async () => {
  const currentDate = new Date();
  const dayOfYear =
    (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
      Date.UTC(currentDate.getFullYear(), 0, 0)) /
    86400000;

  const verse = versesOfTheDay[dayOfYear % versesOfTheDay.length] ?? "1:1:1";

  const bookId = +verse.split(":")[0];
  const chapter = +verse.split(":")[1];
  const verses = verse
    .split(":")[2]
    .split(",")
    .map((v) => +v);

  return {
    image: images[dayOfYear % images.length] ?? img01,
    verse: { bookId, chapter, verses },
  };
};

export const getListOfVersesOfTheDay = async () => {
  return versesOfTheDay.map(bibleUtils.splitVerse);
};
