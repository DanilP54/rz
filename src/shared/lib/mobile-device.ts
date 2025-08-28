import { headers } from "next/headers";

export async function isMobileDevice() {
    const userAgent = (await headers()).get('user-agent');
    const mobileDevices = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    return mobileDevices.some((device) => userAgent?.match(device));
  }
  