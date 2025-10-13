import { NAV_SEGMENTS, SegmentCategory } from "@/shared/model/routes";
import { withNuqsTestingAdapter, type OnUrlUpdateFunction } from 'nuqs/adapters/testing'
import { describe, it } from "vitest";

const TEST_SEGMENT = NAV_SEGMENTS.INSTINCTS
const TEST_CATEGORY: SegmentCategory<typeof NAV_SEGMENTS.INSTINCTS> = 'movies' 

describe("Filters-Bar", () => {
    it("", () => {

    })
})