import { useState } from "react";

const S = 22;
const BX = 55;
const TY = 45;
const OD = 14;
const BW = 30;
const BH = 20;

const OUTDOOR_TOP  = TY;
const BUILDING_TOP = TY + OD * S;
const SVG_W = BX * 2 + BW * S;
const SVG_H = TY + (OD + BH) * S + 80;

const P = {
  cafe:     { bg:"#D4E8C
