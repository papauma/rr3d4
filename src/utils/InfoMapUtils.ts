import { TypeMarker } from "@src/types/ExploreInterfaces";
import { Dimensions } from "react-native";

export default class InfoMapUtils {
    static getSnapPoint(markerType?: TypeMarker) {
        if (markerType === TypeMarker.Stop) {
            return [15, 223, Dimensions.get('window').height * 0.72];
        } else {
            return [5, 15]
        }
    }
}