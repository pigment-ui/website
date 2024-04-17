"use client";

import { useTheme } from "next-themes";
import { capitalize } from "inflection";

export function Colors() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="!my-16 space-y-8">
      {colorValues[resolvedTheme as "light" | "dark"]?.map((color, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-medium">{capitalize(color.name)}</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-8 md:grid-cols-7">
            {color.values.map((value, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="aspect-square w-full rounded-xl" style={{ background: `rgb(${value.value})` }} />
                <span className="text-sm font-semibold">{value.name}</span>
                <span className="whitespace-nowrap text-xs font-semibold text-default-500">{value.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const colorValues = {
  light: [
    {
      name: "default",
      values: [
        { name: "0", value: "255 255 255" },
        { name: "50", value: "250 250 250" },
        { name: "100", value: "245 245 245" },
        { name: "200", value: "229 229 229" },
        { name: "300", value: "212 212 212" },
        { name: "400", value: "163 163 163" },
        { name: "500", value: "115 115 115" },
        { name: "600", value: "82 82 82" },
        { name: "700", value: "64 64 64" },
        { name: "800", value: "38 38 38" },
        { name: "900", value: "23 23 23" },
        { name: "950", value: "10 10 10" },
        { name: "1000", value: "0 0 0" },
      ],
    },
    {
      name: "info",
      values: [
        { name: "50", value: "239 246 255" },
        { name: "100", value: "219 234 254" },
        { name: "200", value: "191 219 254" },
        { name: "300", value: "147 197 253" },
        { name: "400", value: "96 165 250" },
        { name: "500", value: "59 130 246" },
        { name: "600", value: "37 99 235" },
        { name: "700", value: "29 78 216" },
        { name: "800", value: "30 64 175" },
        { name: "900", value: "30 58 138" },
        { name: "950", value: "23 37 84" },
      ],
    },
    {
      name: "success",
      values: [
        { name: "50", value: "240 253 244" },
        { name: "100", value: "220 252 231" },
        { name: "200", value: "187 247 208" },
        { name: "300", value: "134 239 172" },
        { name: "400", value: "74 222 128" },
        { name: "500", value: "34 197 94" },
        { name: "600", value: "22 163 74" },
        { name: "700", value: "21 128 61" },
        { name: "800", value: "22 101 52" },
        { name: "900", value: "20 83 45" },
        { name: "950", value: "5 46 22" },
      ],
    },
    {
      name: "warning",
      values: [
        { name: "50", value: "254 252 232" },
        { name: "100", value: "254 249 195" },
        { name: "200", value: "254 240 138" },
        { name: "300", value: "253 224 71" },
        { name: "400", value: "250 204 21" },
        { name: "500", value: "234 179 8" },
        { name: "600", value: "202 138 4" },
        { name: "700", value: "161 98 7" },
        { name: "800", value: "133 77 14" },
        { name: "900", value: "113 63 18" },
        { name: "950", value: "66 32 6" },
      ],
    },
    {
      name: "error",
      values: [
        { name: "50", value: "254 242 242" },
        { name: "100", value: "254 226 226" },
        { name: "200", value: "254 202 202" },
        { name: "300", value: "252 165 165" },
        { name: "400", value: "248 113 113" },
        { name: "500", value: "239 68 68" },
        { name: "600", value: "220 38 38" },
        { name: "700", value: "185 28 28" },
        { name: "800", value: "153 27 27" },
        { name: "900", value: "127 29 29" },
        { name: "950", value: "69 10 10" },
      ],
    },
  ],
  dark: [
    {
      name: "default",
      values: [
        { name: "0", value: "0 0 0" },
        { name: "50", value: "10 10 10" },
        { name: "100", value: "23 23 23" },
        { name: "200", value: "38 38 38" },
        { name: "300", value: "64 64 64" },
        { name: "400", value: "82 82 82" },
        { name: "500", value: "115 115 115" },
        { name: "600", value: "163 163 163" },
        { name: "700", value: "212 212 212" },
        { name: "800", value: "229 229 229" },
        { name: "900", value: "245 245 245" },
        { name: "950", value: "250 250 250" },
        { name: "1000", value: "255 255 255" },
      ],
    },
    {
      name: "info",
      values: [
        { name: "50", value: "23 37 84" },
        { name: "100", value: "30 58 138" },
        { name: "200", value: "30 64 175" },
        { name: "300", value: "29 78 216" },
        { name: "400", value: "37 99 235" },
        { name: "500", value: "59 130 246" },
        { name: "600", value: "96 165 250" },
        { name: "700", value: "147 197 253" },
        { name: "800", value: "191 219 254" },
        { name: "900", value: "219 234 254" },
        { name: "950", value: "239 246 255" },
      ],
    },
    {
      name: "success",
      values: [
        { name: "50", value: "5 46 22" },
        { name: "100", value: "20 83 45" },
        { name: "200", value: "22 101 52" },
        { name: "300", value: "21 128 61" },
        { name: "400", value: "22 163 74" },
        { name: "500", value: "34 197 94" },
        { name: "600", value: "74 222 128" },
        { name: "700", value: "134 239 172" },
        { name: "800", value: "187 247 208" },
        { name: "900", value: "220 252 231" },
        { name: "950", value: "240 253 244" },
      ],
    },
    {
      name: "warning",
      values: [
        { name: "50", value: "66 32 6" },
        { name: "100", value: "113 63 18" },
        { name: "200", value: "133 77 14" },
        { name: "300", value: "161 98 7" },
        { name: "400", value: "202 138 4" },
        { name: "500", value: "234 179 8" },
        { name: "600", value: "250 204 21" },
        { name: "700", value: "253 224 71" },
        { name: "800", value: "254 240 138" },
        { name: "900", value: "254 249 195" },
        { name: "950", value: "254 252 232" },
      ],
    },
    {
      name: "error",
      values: [
        { name: "50", value: "69 10 10" },
        { name: "100", value: "127 29 29" },
        { name: "200", value: "153 27 27" },
        { name: "300", value: "185 28 28" },
        { name: "400", value: "220 38 38" },
        { name: "500", value: "239 68 68" },
        { name: "600", value: "248 113 113" },
        { name: "700", value: "252 165 165" },
        { name: "800", value: "254 202 202" },
        { name: "900", value: "254 226 226" },
        { name: "950", value: "254 242 242" },
      ],
    },
  ],
};
