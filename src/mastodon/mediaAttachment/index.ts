// This schema is base on https://docs.joinmastodon.org/entities/MediaAttachment/
import { z } from "zod";
import { Gifv } from "./gifv.js";
import { Image } from "./image.js";
import { Video } from "./video.js";
import { Audio } from "./audio.js";
import { Unknown } from "./unknown.js";

export const MediaAttachment = z.union([Image, Gifv, Video, Audio, Unknown]);
export type MediaAttachment = z.infer<typeof MediaAttachment>;
