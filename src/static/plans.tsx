import { BiWorld } from "react-icons/bi";
import { FaPeopleArrows, FaPray, FaWater } from "react-icons/fa";
import { FaLocust } from "react-icons/fa6";
import { GiCelebrationFire, GiDoorway, GiPlainDagger, GiRing, GiWhiteTower } from "react-icons/gi";
import { LuSoup } from "react-icons/lu";
import { MdChildFriendly } from "react-icons/md";
import { PiRainbowCloudFill, PiStepsFill } from "react-icons/pi";
import { RiShip2Fill } from "react-icons/ri";

export interface PlanOfDay {
  icon: JSX.Element;
  position: number;
  read: {
    book: number;
    chapter: number;
  }[];
}

const size = 36;

export const plans: { plan365: (PlanOfDay | string)[] } = {
  plan365: [
    "Gênesis",
    // day 1
    {
      icon: <BiWorld size={size} />,
      position: 3,
      read: [
        { book: 1, chapter: 1 },
        { book: 1, chapter: 2 },
        { book: 1, chapter: 3 },
      ],
    },
    // day 2
    {
      icon: <RiShip2Fill size={size} />,
      position: 4,
      read: [
        { book: 1, chapter: 4 },
        { book: 1, chapter: 5 },
        { book: 1, chapter: 6 },
      ],
    },
    // day 3
    {
      icon: <PiRainbowCloudFill size={size} />,
      position: 5,
      read: [
        { book: 1, chapter: 7 },
        { book: 1, chapter: 8 },
        { book: 1, chapter: 9 },
      ],
    },
    // day 4
    {
      icon: <GiWhiteTower size={size} />,
      position: 4,
      read: [
        { book: 1, chapter: 10 },
        { book: 1, chapter: 11 },
        { book: 1, chapter: 12 },
      ],
    },
    // day 5
    {
      icon: <GiRing size={size} />,
      position: 3,
      read: [
        { book: 1, chapter: 13 },
        { book: 1, chapter: 14 },
        { book: 1, chapter: 15 },
      ],
    },
    // day 6
    {
      icon: <FaPray size={size} />,
      position: 2,
      read: [
        { book: 1, chapter: 16 },
        { book: 1, chapter: 17 },
        { book: 1, chapter: 18 },
      ],
    },
    // day 7
    {
      icon: <MdChildFriendly size={size} />,
      position: 1,
      read: [
        { book: 1, chapter: 19 },
        { book: 1, chapter: 20 },
        { book: 1, chapter: 21 },
      ],
    },
    // day 8
    {
      icon: <GiPlainDagger size={size} />,
      position: 2,
      read: [
        { book: 1, chapter: 22 },
        { book: 1, chapter: 23 },
        { book: 1, chapter: 24 },
      ],
    },
    // day 9
    {
      icon: <LuSoup size={size} />,
      position: 3,
      read: [
        { book: 1, chapter: 25 },
        { book: 1, chapter: 26 },
        { book: 1, chapter: 27 },
      ],
    },
    // day 10
    {
      icon: <PiStepsFill size={size} />,
      position: 4,
      read: [
        { book: 1, chapter: 28 },
        { book: 1, chapter: 29 },
        { book: 1, chapter: 30 },
      ],
    },
    // day 11
    {
      icon: <FaPeopleArrows size={size} />,
      position: 5,
      read: [
        { book: 1, chapter: 31 },
        { book: 1, chapter: 32 },
        { book: 1, chapter: 33 },
      ],
    },
    // day 12
    {
      icon: <FaPeopleArrows size={size} />,
      position: 4,
      read: [
        { book: 1, chapter: 34 },
        { book: 1, chapter: 35 },
        { book: 1, chapter: 36 },
      ],
    },
    // day 13
    {
      icon: <FaPeopleArrows size={size} />,
      position: 3,
      read: [
        { book: 1, chapter: 37 },
        { book: 1, chapter: 38 },
        { book: 1, chapter: 39 },
      ],
    },
    // day 14
    {
      icon: <FaPeopleArrows size={size} />,
      position: 2,
      read: [
        { book: 1, chapter: 40 },
        { book: 1, chapter: 41 },
        { book: 1, chapter: 42 },
      ],
    },
    // day 15
    {
      icon: <FaPeopleArrows size={size} />,
      position: 1,
      read: [
        { book: 1, chapter: 43 },
        { book: 1, chapter: 44 },
        { book: 1, chapter: 45 },
      ],
    },
    // day 16
    {
      icon: <FaPeopleArrows size={size} />,
      position: 2,
      read: [
        { book: 1, chapter: 46 },
        { book: 1, chapter: 47 },
        { book: 1, chapter: 48 },
      ],
    },
    // day 17
    {
      icon: <FaPeopleArrows size={size} />,
      position: 3,
      read: [
        { book: 1, chapter: 49 },
        { book: 1, chapter: 50 },
      ],
    },
    "Êxodo",
    // day 18
    {
      icon: <GiCelebrationFire size={size} />,
      position: 3,
      read: [
        { book: 2, chapter: 1 },
        { book: 2, chapter: 2 },
        { book: 2, chapter: 3 },
        { book: 2, chapter: 4 },
      ],
    },
    // day 19
    {
      icon: <FaWater size={size} />,
      position: 2,
      read: [
        { book: 2, chapter: 5 },
        { book: 2, chapter: 6 },
        { book: 2, chapter: 7 },
      ],
    },
    // day 20
    {
      icon: <FaLocust size={size} />,
      position: 1,
      read: [
        { book: 2, chapter: 8 },
        { book: 2, chapter: 9 },
        { book: 2, chapter: 10 },
      ],
    },
    // day 21
    {
      icon: <GiDoorway size={size} />,
      position: 2,
      read: [
        { book: 2, chapter: 11 },
        { book: 2, chapter: 12 },
        { book: 2, chapter: 13 },
      ],
    },
    // day 22
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 2, chapter: 14 },
        { book: 2, chapter: 15 },
        { book: 2, chapter: 16 },
      ],
    },
    // day 23
    {
      icon: <GiDoorway size={size} />,
      position: 4,
      read: [
        { book: 2, chapter: 17 },
        { book: 2, chapter: 18 },
        { book: 2, chapter: 19 },
      ],
    },
    // day 24
    {
      icon: <GiDoorway size={size} />,
      position: 5,
      read: [
        { book: 2, chapter: 20 },
        { book: 2, chapter: 21 },
        { book: 2, chapter: 22 },
      ],
    },
    // day 25
    {
      icon: <GiDoorway size={size} />,
      position: 4,
      read: [
        { book: 2, chapter: 23 },
        { book: 2, chapter: 24 },
        { book: 2, chapter: 25 },
      ],
    },
    // day 26
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 2, chapter: 26 },
        { book: 2, chapter: 27 },
        { book: 2, chapter: 28 },
      ],
    },
    // day 27
    {
      icon: <GiDoorway size={size} />,
      position: 2,
      read: [
        { book: 2, chapter: 29 },
        { book: 2, chapter: 30 },
        { book: 2, chapter: 31 },
      ],
    },
    // day 28
    {
      icon: <GiDoorway size={size} />,
      position: 1,
      read: [
        { book: 2, chapter: 32 },
        { book: 2, chapter: 33 },
        { book: 2, chapter: 34 },
      ],
    },
    // day 29
    {
      icon: <GiDoorway size={size} />,
      position: 2,
      read: [
        { book: 2, chapter: 35 },
        { book: 2, chapter: 36 },
        { book: 2, chapter: 37 },
      ],
    },
    // day 30
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 2, chapter: 38 },
        { book: 2, chapter: 39 },
        { book: 2, chapter: 40 },
      ],
    },
    "Levítico",
    // day 31
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 3, chapter: 1 },
        { book: 3, chapter: 2 },
        { book: 3, chapter: 3 },
      ],
    },
    // day 32
    {
      icon: <GiDoorway size={size} />,
      position: 4,
      read: [
        { book: 3, chapter: 4 },
        { book: 3, chapter: 5 },
        { book: 3, chapter: 6 },
      ],
    },
    // day 33
    {
      icon: <GiDoorway size={size} />,
      position: 5,
      read: [
        { book: 3, chapter: 7 },
        { book: 3, chapter: 8 },
        { book: 3, chapter: 9 },
      ],
    },
    // day 34
    {
      icon: <GiDoorway size={size} />,
      position: 4,
      read: [
        { book: 3, chapter: 10 },
        { book: 3, chapter: 11 },
        { book: 3, chapter: 12 },
      ],
    },
    // day 35
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 3, chapter: 13 },
        { book: 3, chapter: 14 },
        { book: 3, chapter: 15 },
        { book: 3, chapter: 16 },
      ],
    },
    // day 36
    {
      icon: <GiDoorway size={size} />,
      position: 2,
      read: [
        { book: 3, chapter: 17 },
        { book: 3, chapter: 18 },
        { book: 3, chapter: 19 },
      ],
    },
    // day 37
    {
      icon: <GiDoorway size={size} />,
      position: 1,
      read: [
        { book: 3, chapter: 20 },
        { book: 3, chapter: 21 },
        { book: 3, chapter: 22 },
      ],
    },
    // day 38
    {
      icon: <GiDoorway size={size} />,
      position: 2,
      read: [
        { book: 3, chapter: 23 },
        { book: 3, chapter: 24 },
        { book: 3, chapter: 25 },
      ],
    },
    // day 39
    {
      icon: <GiDoorway size={size} />,
      position: 3,
      read: [
        { book: 3, chapter: 26 },
        { book: 3, chapter: 27 },
      ],
    },
  ],
};
