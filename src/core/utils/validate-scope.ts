export function validateScope(scope: "pdvflow" | "pdvmobile" | "toten-auto") {
	switch (scope) {
		case "pdvflow":
			return "SyncedPdv";
		case "pdvmobile":
			return "SyncedPOSMobile";
		case "toten-auto":
			return "SyncedTotenAuto";
	}
}
