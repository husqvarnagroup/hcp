type tIDigitalInput_PinIndex = Number;
type tIDigitalOutput_PinIndex = Number;
type tLinkManagerPortId = Number;
/** Cake */
type foo = tLinkManagerPortId;
type cake = tLinkManagerPortId;
type tILinkManagerLinkId = Number;
type tDrivingSettings_DrivePastWire = Number;


enum tIBladeMotorRunningStatus {
	/** Not Running */
	IBLADEMOTOR_RUNNING_STATUS_NOT_RUNNING = 0,
	/** Starting */
	IBLADEMOTOR_RUNNING_STATUS_STARTING = 1,
	/** Stopping */
	IBLADEMOTOR_RUNNING_STATUS_STOPPING = 2,
	/** Running */
	IBLADEMOTOR_RUNNING_STATUS_RUNNING = 3
}

enum tCircularCondition {
	/** Ready for new trig */
	CIRCULAR_CONDITION_DRIVING_FORWARD = 0,
	/** Wait with next trig */
	CIRCULAR_CONDITION_CIRCLE_READY = 1,
	/** Do not trig or update average current */
	CIRCULAR_CONDITION_OUTSIDE = 2
}

enum tIntensiveCuttingStatus {
	/** Disabled */
	INTENSIVE_CUT_DISABLED = 0,
	/** Preparing */
	INTENSIVE_CUT_PREPARING = 1,
	/** Not Trigged */
	INTENSIVE_CUT_NOT_TRIGGED = 2,
	/** Trigged */
	INTENSIVE_CUT_TRIGGED = 3,
	/** Cancel */
	INTENSIVE_CUT_CANCEL = 4
}

enum tSoundType {
	/** Key Click */
	SOUND_KEY_CLICK = 0,
	/** Click Sound */
	SOUND_CLICK = 1,
	/** Charging Connected */
	SOUND_CHARGING_CONNECTED = 2,
	/** Charging Disconnected */
	SOUND_CHARGING_DISCONNECTED = 3,
	/** Double Beep */
	SOUND_DOUBLE_BEEP = 4,
	/** Long Beep */
	SOUND_LONG_BEEP = 5,
	/** Fault */
	SOUND_FAULT = 6,
	/** Start Cutting */
	SOUND_START_CUTTING = 7,
	/** Alarm Warning */
	SOUND_ALARM_WARNING = 8,
	/** Alarm 1 minute */
	SOUND_ALARM_1 = 9,
	/** Alarm 2 minutes */
	SOUND_ALARM_2 = 10,
	/** Alarm 5 minutes */
	SOUND_ALARM_5 = 11,
	/** Alarm 10 minutes */
	SOUND_ALARM_10 = 12,
	/** Tone 1 minute */
	SOUND_TONE_1 = 13,
	/** Sound Off */
	SOUND_OFF = 14
}

enum tILoopSamplerLoops {
	/** A */
	LOOPSAMPLER_LOOP_A = 0,
	/** F */
	LOOPSAMPLER_LOOP_F = 1,
	/** N */
	LOOPSAMPLER_LOOP_N = 2,
	/** Guide 1 */
	LOOPSAMPLER_LOOP_G1 = 3,
	/** Guide 2 */
	LOOPSAMPLER_LOOP_G2 = 4,
	/** Guide 3 */
	LOOPSAMPLER_LOOP_G3 = 5,
	LOOPSAMPLER_NUMBER_OF_LOOPS = 6
}

enum tReturn {
	/** OK */
	OK = 0,
	/** Undefined error */
	E_UNDEFINED = 1,
	/** Invalid value in argument */
	E_INVALID_VALUE = 2,
	/** Unexpected timeout */
	E_TIMEOUT = 3,
	/** Overflow in data communication */
	E_OVERFLOW = 4,
	/** No memory buffer available in pool */
	E_OUT_OF_MEMORY = 5,
	/** Undefined warning */
	W_UNDEFINED = 64,
	/** Warning: Busy. May need an action */
	W_BUSY = 65,
	/** Undefined info */
	I_UNDEFINED = 128,
	/** Info: Busy. No action needed */
	I_BUSY = 129,
	/** Info: The call put in queue */
	I_QUEUED = 130
}

enum tNVRAMStatus {
	/** Ready */
	NVRAM_READY = 0,
	/** Error */
	NVRAM_ERROR = 1,
	/** Busy */
	NVRAM_BUSY = 2
}

enum tILinkManagerPacketType {
	/** Standard */
	ILINKMANAGER_PACKET_TYPE_STANDARD = 0,
	/** Extended Full */
	ILINKMANAGER_PACKET_TYPE_EXTENDED_FULL = 128,
	/** Extended Transaction Id */
	ILINKMANAGER_PACKET_TYPE_EXTENDED_TRANS = 129,
	/** Encrypted */
	ILINKMANAGER_PACKET_TYPE_ENCRYPTED = 254,
	/** Linked */
	ILINKMANAGER_PACKET_TYPE_LINKED = 253,
	/** Standard */
	ILINKMANAGER_PACKET_TYPE_STANDARD = 0,
	/** Extended Full */
	ILINKMANAGER_PACKET_TYPE_EXTENDED_FULL = 128,
	/** Extended Transaction Id */
	ILINKMANAGER_PACKET_TYPE_EXTENDED_TRANS = 129,
	/** Encrypted */
	ILINKMANAGER_PACKET_TYPE_ENCRYPTED = 254,
	/** Linked */
	ILINKMANAGER_PACKET_TYPE_LINKED = 253
}

enum tDeviceTypeGroup {
	DEVICE_TYPE_GROUP_UNDEFINED = 0,
	DEVICE_TYPE_GROUP_GPS_BOARD = 1,
	DEVICE_TYPE_GROUP_MOWER = 10,
	DEVICE_TYPE_GROUP_MMI = 11,
	DEVICE_TYPE_GROUP_CS = 12,
	DEVICE_TYPE_GROUP_ULTRASONIC = 13,
	DEVICE_TYPE_GROUP_MOWER_BOOT = 14,
	DEVICE_TYPE_GROUP_MOWER_LOADER = 15,
	DEVICE_TYPE_GROUP_COM_UNIT = 16,
	DEVICE_TYPE_GROUP_COM_UNIT_BOOT = 17,
	DEVICE_TYPE_GROUP_MAIN_BOARD = 20,
	DEVICE_TYPE_GROUP_MMI_BOARD = 21,
	DEVICE_TYPE_GROUP_CS_BOARD = 22,
	DEVICE_TYPE_GROUP_US_BOARD = 23,
	DEVICE_TYPE_GROUP_COM_BOARD = 24,
	DEVICE_TYPE_GROUP_SW_MOWER = 31,
	DEVICE_TYPE_GROUP_SW_MMI = 32,
	DEVICE_TYPE_GROUP_SW_CS = 33,
	DEVICE_TYPE_GROUP_SW_START = 34,
	DEVICE_TYPE_GROUP_SW_ULTRASONIC = 35,
	DEVICE_TYPE_GROUP_SW_COM = 36
}

enum tMowerDeviceType {
	MOWER_DEVICE_TYPE_UNDEFINED = 0,
	MOWER_DEVICE_TYPE_B = 1,
	MOWER_DEVICE_TYPE_C = 2,
	MOWER_DEVICE_TYPE_D = 3,
	MOWER_DEVICE_TYPE_E = 4,
	MOWER_DEVICE_TYPE_F = 5,
	MOWER_DEVICE_TYPE_G = 6,
	MOWER_DEVICE_TYPE_H = 7,
	MOWER_DEVICE_TYPE_I = 8,
	MOWER_DEVICE_TYPE_J = 9,
	MOWER_DEVICE_TYPE_K = 10,
	MOWER_DEVICE_TYPE_L = 11,
	MOWER_DEVICE_TYPE_M = 12,
	MOWER_DEVICE_TYPE_N = 13,
	MOWER_DEVICE_TYPE_NO_MORE = 14
}

enum tMowerVariantType {
	MOWER_VARIANT_TYPE_UNDEFINED = 255,
	MOWER_VARIANT_TYPE_ORG = 0,
	MOWER_VARIANT_TYPE_B = 1,
	MOWER_VARIANT_TYPE_C = 2,
	MOWER_VARIANT_TYPE_D = 3,
	MOWER_VARIANT_TYPE_E = 4,
	MOWER_VARIANT_TYPE_NO_MORE = 5
}

enum tWheelMotorType {
	/** Dunker BG40 */
	WHEEL_MOTOR_TYPE_DUNKER_BG40 = 3,
	/** Linix */
	WHEEL_MOTOR_TYPE_LINIX = 5,
	/** Johnson 11K3068 (2-stage gear box) */
	WHEEL_MOTOR_TYPE_JOHNSON_11K3068 = 6
}



export namespace Authentication {
	/**
	 *  Input interface for Authentication.GetRequestAccess
	 */
	export interface tInGetRequestAccess {
		accesslevel: Number
	}
	/**
	 *  Input interface for Authentication.SetSignedResponse
	 */
	export interface tInSetSignedResponse {
		sres: Number
	}
	/**
	 *  Input interface for Authentication.EnterPinCode
	 */
	export interface tInEnterPinCode {
		accessLevel: Number
		currentPIN: Number
	}
	/**
	 *  Input interface for Authentication.RequestAccess
	 */
	export interface tInRequestAccess {
		accessLevel: Number
	}
	/**
	 *  Input interface for Authentication.SignedResponse
	 */
	export interface tInSignedResponse {
		signedResponse: Number
	}
	/**
	 *  Input interface for Authentication.TemporaryLogin
	 */
	export interface tInTemporaryLogin {
		accessLevel: Number
		currentPIN: Number
	}

	export function GetRequestAccessI(codec : any, args : tInGetRequestAccess): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.GetRequestAccess(accesslevel: ' + __args.accesslevel+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetRequestAccess(codec : any, accesslevel: Number): Promise<Number> {
		return GetRequestAccessI(codec, {
				accesslevel: accesslevel
		});
	}

	export function SetSignedResponseI(codec : any, args : tInSetSignedResponse): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.SetSignedResponse(sres: ' + __args.sres+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSignedResponse(codec : any, sres: Number): Promise<Number> {
		return SetSignedResponseI(codec, {
				sres: sres
		});
	}

	export function EnterPinCodeI(codec : any, args : tInEnterPinCode): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.EnterPinCode(accessLevel: ' + __args.accessLevel+ ',currentPIN: ' + __args.currentPIN+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function EnterPinCode(codec : any, accessLevel: Number, currentPIN: Number): Promise<Number> {
		return EnterPinCodeI(codec, {
				accessLevel: accessLevel,
				currentPIN: currentPIN
		});
	}

	export function RequestAccessI(codec : any, args : tInRequestAccess): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.RequestAccess(accessLevel: ' + __args.accessLevel+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function RequestAccess(codec : any, accessLevel: Number): Promise<Number> {
		return RequestAccessI(codec, {
				accessLevel: accessLevel
		});
	}

	export function SignedResponseI(codec : any, args : tInSignedResponse): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.SignedResponse(signedResponse: ' + __args.signedResponse+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SignedResponse(codec : any, signedResponse: Number): Promise<Number> {
		return SignedResponseI(codec, {
				signedResponse: signedResponse
		});
	}

	export function GetCurrentAccess(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('Authentication.GetCurrentAccess()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPin1(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('Authentication.GetPin1()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TemporaryLoginI(codec : any, args : tInTemporaryLogin): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Authentication.TemporaryLogin(accessLevel: ' + __args.accessLevel+ ',currentPIN: ' + __args.currentPIN+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TemporaryLogin(codec : any, accessLevel: Number, currentPIN: Number): Promise<Number> {
		return TemporaryLoginI(codec, {
				accessLevel: accessLevel,
				currentPIN: currentPIN
		});
	}
}

export namespace StatusCommands {
	/**
	 *  Output interface for StatusCommands.GetCurrentStatusKeepAlive
	 */
	export interface tOutGetCurrentStatusKeepAlive {
		state: Number
		substate: Number
		mode: Number
		opmode: Number
		hostmsg: Number
	}

	export function GetCurrentStatusKeepAlive(codec : any): Promise<tOutGetCurrentStatusKeepAlive> {
		let __args = {};

		try {
			return codec.send('StatusCommands.GetCurrentStatusKeepAlive()');
		} catch(error) {
			return new Promise<tOutGetCurrentStatusKeepAlive>((res,reject) => { reject(error);});
		}
	}
}

export namespace Command {

	export function NAK(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('Command.NAK()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}
}

export namespace SoftwareUpdate {
	/**
	 *  Input interface for SoftwareUpdate.MainSW
	 */
	export interface tInMainSW {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.MainBootSw
	 */
	export interface tInMainBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.SlaveBootSw
	 */
	export interface tInSlaveBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.SlaveSw
	 */
	export interface tInSlaveSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.MmiSw
	 */
	export interface tInMmiSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.MmiBootSw
	 */
	export interface tInMmiBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.UltrasonicSw
	 */
	export interface tInUltrasonicSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.UltrasonicBootSw
	 */
	export interface tInUltrasonicBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.TrackerSw
	 */
	export interface tInTrackerSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.TrackerBootSw
	 */
	export interface tInTrackerBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.SetAddressSpace
	 */
	export interface tInSetAddressSpace {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.ProgramData
	 */
	export interface tInProgramData {
		address: Number
		length: Number
		data: Uint8Array
	}
	/**
	 *  Input interface for SoftwareUpdate.VerifyChSumAndRestart
	 */
	export interface tInVerifyChSumAndRestart {
		address: Number
		length: Number
		chsum: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.JumpToBootSw
	 */
	export interface tInJumpToBootSw {
		address: Number
		length: Number
		data: Number
	}
	/**
	 *  Input interface for SoftwareUpdate.FlashBootSwFromLoaderSw
	 */
	export interface tInFlashBootSwFromLoaderSw {
		address: Number
		length: Number
		data: Number
	}

	export function MainSWI(codec : any, args : tInMainSW): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.MainSW(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function MainSW(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return MainSWI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function MainBootSwI(codec : any, args : tInMainBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.MainBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function MainBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return MainBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function SlaveBootSwI(codec : any, args : tInSlaveBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.SlaveBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SlaveBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return SlaveBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function SlaveSwI(codec : any, args : tInSlaveSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.SlaveSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SlaveSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return SlaveSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function MmiSwI(codec : any, args : tInMmiSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.MmiSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function MmiSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return MmiSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function MmiBootSwI(codec : any, args : tInMmiBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.MmiBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function MmiBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return MmiBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function UltrasonicSwI(codec : any, args : tInUltrasonicSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.UltrasonicSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function UltrasonicSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return UltrasonicSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function UltrasonicBootSwI(codec : any, args : tInUltrasonicBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.UltrasonicBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function UltrasonicBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return UltrasonicBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function TrackerSwI(codec : any, args : tInTrackerSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.TrackerSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TrackerSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return TrackerSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function TrackerBootSwI(codec : any, args : tInTrackerBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.TrackerBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TrackerBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return TrackerBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function SetAddressSpaceI(codec : any, args : tInSetAddressSpace): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.SetAddressSpace(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetAddressSpace(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return SetAddressSpaceI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function ProgramDataI(codec : any, args : tInProgramData): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.ProgramData(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ProgramData(codec : any, address: Number, length: Number, data: Uint8Array): Promise<Number> {
		return ProgramDataI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function VerifyChSumAndRestartI(codec : any, args : tInVerifyChSumAndRestart): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.VerifyChSumAndRestart(address: ' + __args.address+ ',length: ' + __args.length+ ',chsum: ' + __args.chsum+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function VerifyChSumAndRestart(codec : any, address: Number, length: Number, chsum: Number): Promise<Number> {
		return VerifyChSumAndRestartI(codec, {
				address: address,
				length: length,
				chsum: chsum
		});
	}

	export function JumpToBootSwI(codec : any, args : tInJumpToBootSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.JumpToBootSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function JumpToBootSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return JumpToBootSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}

	export function FlashBootSwFromLoaderSwI(codec : any, args : tInFlashBootSwFromLoaderSw): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SoftwareUpdate.FlashBootSwFromLoaderSw(address: ' + __args.address+ ',length: ' + __args.length+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FlashBootSwFromLoaderSw(codec : any, address: Number, length: Number, data: Number): Promise<Number> {
		return FlashBootSwFromLoaderSwI(codec, {
				address: address,
				length: length,
				data: data
		});
	}
}

export namespace SystemSettings {
	/**
	 *  Output interface for SystemSettings.GetCommunicationBoardAPN
	 */
	export interface tOutGetCommunicationBoardAPN {
		apn: String
		username: String
		password: String
	}
	/**
	 *  Output interface for SystemSettings.SetCommunicationBoardAPN
	 */
	export interface tOutSetCommunicationBoardAPN {
		apn: String
		username: String
		password: String
	}
	/**
	 *  Input interface for SystemSettings.SetCommunicationBoardAPN
	 */
	export interface tInSetCommunicationBoardAPN {
		pincode: Number
		apn: String
		username: String
		password: String
	}
	/**
	 *  Input interface for SystemSettings.GetCommunicationBoardReportInterval
	 */
	export interface tInGetCommunicationBoardReportInterval {
		commandinitiator: Number
	}
	/**
	 *  Input interface for SystemSettings.SetCommunicationBoardReportInterval
	 */
	export interface tInSetCommunicationBoardReportInterval {
		commandinitiator: Number
		pincode: Number
		interval: Number
	}
	/**
	 *  Input interface for SystemSettings.GetCommunicationBoardSettings
	 */
	export interface tInGetCommunicationBoardSettings {
		commandinitiator: Number
	}
	/**
	 *  Input interface for SystemSettings.SetCommunicationBoardSettings
	 */
	export interface tInSetCommunicationBoardSettings {
		commandinitiator: Number
		pincode: Number
		trackerpowermode: Number
		disablecominterface: Number
	}
	/**
	 *  Output interface for SystemSettings.GetGeofence
	 */
	export interface tOutGetGeofence {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		northsouth: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		eastwest: Number
		altitude: Number
	}
	/**
	 *  Input interface for SystemSettings.GetGeofence
	 */
	export interface tInGetGeofence {
		commandinitiator: Number
	}
	/**
	 *  Output interface for SystemSettings.SetGeofence
	 */
	export interface tOutSetGeofence {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		northsouth: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		eastwest: Number
		altitude: Number
	}
	/**
	 *  Input interface for SystemSettings.SetGeofence
	 */
	export interface tInSetGeofence {
		commandinitiator: Number
		pincode: Number
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		northsouth: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		eastwest: Number
		altitude: Number
	}
	/**
	 *  Output interface for SystemSettings.GetGeofenceSensitivity
	 */
	export interface tOutGetGeofenceSensitivity {
		sesitivity: Number
		geofenceradius: Number
		timeoutside: Number
	}
	/**
	 *  Input interface for SystemSettings.GetGeofenceSensitivity
	 */
	export interface tInGetGeofenceSensitivity {
		commandinitiator: Number
	}
	/**
	 *  Output interface for SystemSettings.SetGeofenceSensitivity
	 */
	export interface tOutSetGeofenceSensitivity {
		sesitivity: Number
		geofenceradius: Number
		timeoutside: Number
	}
	/**
	 *  Input interface for SystemSettings.SetGeofenceSensitivity
	 */
	export interface tInSetGeofenceSensitivity {
		commandinitiator: Number
		pincode: Number
		sesitivity: Number
		geofenceradius: Number
		timeoutside: Number
	}
	/**
	 *  Output interface for SystemSettings.GetTrackerDNSName
	 */
	export interface tOutGetTrackerDNSName {
		port: Number
		dnsname: String
	}
	/**
	 *  Output interface for SystemSettings.SetTrackerDNSName
	 */
	export interface tOutSetTrackerDNSName {
		port: Number
		dnsname: String
	}
	/**
	 *  Input interface for SystemSettings.SetTrackerDNSName
	 */
	export interface tInSetTrackerDNSName {
		pin: Number
		port: Number
		dnsname: String
	}
	/**
	 *  Output interface for SystemSettings.GetComBoardSecondDNSName
	 */
	export interface tOutGetComBoardSecondDNSName {
		port: Number
		dnsname: String
	}
	/**
	 *  Output interface for SystemSettings.SetComBoardSecondDNSName
	 */
	export interface tOutSetComBoardSecondDNSName {
		port: Number
		dnsname: String
	}
	/**
	 *  Input interface for SystemSettings.SetComBoardSecondDNSName
	 */
	export interface tInSetComBoardSecondDNSName {
		pin: Number
		port: Number
		dnsname: String
	}
	/**
	 *  Input interface for SystemSettings.GetTrackerPhonenumber
	 */
	export interface tInGetTrackerPhonenumber {
		commandinitiator: Number
	}
	/**
	 *  Input interface for SystemSettings.SetTrackerPhonenumber
	 */
	export interface tInSetTrackerPhonenumber {
		commandinitiator: Number
		pincode: Number
		phonenumberindex: Number
		phonenumber: String
	}
	/**
	 *  Output interface for SystemSettings.GetTime
	 */
	export interface tOutGetTime {
		hour: Number
		minute: Number
		second: Number
	}
	/**
	 *  Output interface for SystemSettings.GetDate
	 */
	export interface tOutGetDate {
		year: Number
		month: Number
		date: Number
		dateTimeFormat: Number
	}
	/**
	 *  Output interface for SystemSettings.GetMmiSettings
	 */
	export interface tOutGetMmiSettings {
		language_LCID: Number
		messageLevel: Number
		userMmiOptions: Number
		country: Number
		timeZone: Number
		systemMmiOptions: Number
	}
	/**
	 *  Output interface for SystemSettings.GetSoundSettings
	 */
	export interface tOutGetSoundSettings {
		keypadSound: Number
		operationSound: Number
		startupSound: Number
	}
	/**
	 *  Output interface for SystemSettings.GetSecuritySettings
	 */
	export interface tOutGetSecuritySettings {
		blockTime: Number
		alarmTime: Number
		timeLockInterval: Number
		securityFunctions: Number
	}
	/**
	 *  Output interface for SystemSettings.GetUserSettings
	 */
	export interface tOutGetUserSettings {
		userSettingsIndex: Number
		userSettingsInUse: Number
	}
	/**
	 *  Output interface for SystemSettings.GetCuttingHeight
	 */
	export interface tOutGetCuttingHeight {
		targetHeight: Number
		initialHeight: Number
		currentHeight: Number
		motorCurrent: Number
		cuttingHeightStatus: Number
		cuttingHeightFault: Number
		timeToTargetHeight: Number
	}
	/**
	 *  Output interface for SystemSettings.GetUserSettingsName
	 */
	export interface tOutGetUserSettingsName {
		userSettingsIndex: Number
		userSettingName: String
	}
	/**
	 *  Input interface for SystemSettings.GetUserSettingsName
	 */
	export interface tInGetUserSettingsName {
		userSettingsIndex: Number
	}
	/**
	 *  Output interface for SystemSettings.GetConfigChangeCounter
	 */
	export interface tOutGetConfigChangeCounter {
		deviceTypeGroup: Number
		deviceType: Number
		configChangeCount: Number
	}
	/**
	 *  Input interface for SystemSettings.GetConfigChangeCounter
	 */
	export interface tInGetConfigChangeCounter {
		deviceTypeGroup: Number
		deviceType: Number
		configChangeCount: Number
	}
	/**
	 *  Output interface for SystemSettings.SetTime
	 */
	export interface tOutSetTime {
		hour: Number
		minute: Number
		second: Number
	}
	/**
	 *  Input interface for SystemSettings.SetTime
	 */
	export interface tInSetTime {
		hour: Number
		minute: Number
		second: Number
	}
	/**
	 *  Output interface for SystemSettings.SetDate
	 */
	export interface tOutSetDate {
		year: Number
		month: Number
		date: Number
		dateTimeFormat: Number
	}
	/**
	 *  Input interface for SystemSettings.SetDate
	 */
	export interface tInSetDate {
		year: Number
		month: Number
		date: Number
		dateTimeFormat: Number
	}
	/**
	 *  Output interface for SystemSettings.SetMmiSettings
	 */
	export interface tOutSetMmiSettings {
		language_LCID: Number
		messageLevel: Number
		userMmiOptions: Number
		country: Number
		timeZone: Number
		systemMmiOptions: Number
	}
	/**
	 *  Input interface for SystemSettings.SetMmiSettings
	 */
	export interface tInSetMmiSettings {
		language_LCID: Number
		messageLevel: Number
		userMmiOptions: Number
		country: Number
		timeZone: Number
		systemMmiOptions: Number
	}
	/**
	 *  Output interface for SystemSettings.SetSoundSettings
	 */
	export interface tOutSetSoundSettings {
		keypadSound: Number
		operationSound: Number
		startupSound: Number
	}
	/**
	 *  Input interface for SystemSettings.SetSoundSettings
	 */
	export interface tInSetSoundSettings {
		keypadSound: Number
		operationSound: Number
		startupSound: Number
	}
	/**
	 *  Output interface for SystemSettings.SetSecuritySettings
	 */
	export interface tOutSetSecuritySettings {
		blockTime: Number
		alarmTime: Number
		timeLockInterval: Number
		securityFunctions: Number
	}
	/**
	 *  Input interface for SystemSettings.SetSecuritySettings
	 */
	export interface tInSetSecuritySettings {
		currentPIN1: Number
		alarmTime: Number
		timeLockInterval: Number
		securityFunctions: Number
	}
	/**
	 *  Output interface for SystemSettings.StoreUserSettings
	 */
	export interface tOutStoreUserSettings {
		userSettingsIndex: Number
		userSettingsInUse: Number
	}
	/**
	 *  Input interface for SystemSettings.StoreUserSettings
	 */
	export interface tInStoreUserSettings {
		userSettingsIndex: Number
	}
	/**
	 *  Output interface for SystemSettings.SelectUserSettings
	 */
	export interface tOutSelectUserSettings {
		userSettingsIndex: Number
		userSettingsInUse: Number
	}
	/**
	 *  Input interface for SystemSettings.SelectUserSettings
	 */
	export interface tInSelectUserSettings {
		userSettingsIndex: Number
		userSettingsInUse: Number
	}
	/**
	 *  Input interface for SystemSettings.SetDemoMode
	 */
	export interface tInSetDemoMode {
		demoMode: Number
	}
	/**
	 *  Input interface for SystemSettings.SetLoopDetection
	 */
	export interface tInSetLoopDetection {
		loopDetection: Number
	}
	/**
	 *  Input interface for SystemSettings.SetLoopPeriodTime
	 */
	export interface tInSetLoopPeriodTime {
		loopPeriodTime: Number
		isTemporary: Number
	}
	/**
	 *  Input interface for SystemSettings.SetPin
	 */
	export interface tInSetPin {
		currentPIN: Number
		newPIN: Number
	}
	/**
	 *  Input interface for SystemSettings.SetPin2
	 */
	export interface tInSetPin2 {
		currentPIN: Number
		newPIN: Number
	}
	/**
	 *  Input interface for SystemSettings.EnterNewStartupSequence
	 */
	export interface tInEnterNewStartupSequence {
		currentPIN1: Number
	}
	/**
	 *  Input interface for SystemSettings.SetEcoMode
	 */
	export interface tInSetEcoMode {
		ecoMode: Number
	}
	/**
	 *  Output interface for SystemSettings.SetCuttingHeight
	 */
	export interface tOutSetCuttingHeight {
		targetHeight: Number
		initialHeight: Number
		currentHeight: Number
		motorCurrent: Number
		cuttingHeightStatus: Number
		cuttingHeightFault: Number
		timeToTargetHeight: Number
	}
	/**
	 *  Input interface for SystemSettings.SetCuttingHeight
	 */
	export interface tInSetCuttingHeight {
		targetHeight: Number
		initialHeight: Number
		action: Number
	}
	/**
	 *  Input interface for SystemSettings.SetHeadlightEnabled
	 */
	export interface tInSetHeadlightEnabled {
		headlight: Number
	}
	/**
	 *  Output interface for SystemSettings.SetUserSettingsName
	 */
	export interface tOutSetUserSettingsName {
		userSettingsIndex: Number
		userSettingName: String
	}
	/**
	 *  Input interface for SystemSettings.SetTimestampLastReminder
	 */
	export interface tInSetTimestampLastReminder {
		timestamp: Number
	}
	/**
	 *  Output interface for SystemSettings.SetConfigChangeCounter
	 */
	export interface tOutSetConfigChangeCounter {
		deviceTypeGroup: Number
		deviceType: Number
		configChangeCount: Number
	}
	/**
	 *  Input interface for SystemSettings.SetConfigChangeCounter
	 */
	export interface tInSetConfigChangeCounter {
		deviceTypeGroup: Number
		deviceType: Number
		configChangeCount: Number
	}

	export function GetCommunicationBoardAPN(codec : any): Promise<tOutGetCommunicationBoardAPN> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetCommunicationBoardAPN()');
		} catch(error) {
			return new Promise<tOutGetCommunicationBoardAPN>((res,reject) => { reject(error);});
		}
	}

	export function SetCommunicationBoardAPNI(codec : any, args : tInSetCommunicationBoardAPN): Promise<tOutSetCommunicationBoardAPN> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetCommunicationBoardAPN(pincode: ' + __args.pincode+ ',apn: ' + __args.apn+ ',username: ' + __args.username+ ',password: ' + __args.password+ ')');
		} catch(error) {
			return new Promise<tOutSetCommunicationBoardAPN>((res,reject) => { reject(error);});
		}
	}

	export function SetCommunicationBoardAPN(codec : any, pincode: Number, apn: String, username: String, password: String): Promise<tOutSetCommunicationBoardAPN> {
		return SetCommunicationBoardAPNI(codec, {
				pincode: pincode,
				apn: apn,
				username: username,
				password: password
		});
	}

	export function GetCommunicationBoardReportIntervalI(codec : any, args : tInGetCommunicationBoardReportInterval): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetCommunicationBoardReportInterval(commandinitiator: ' + __args.commandinitiator+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetCommunicationBoardReportInterval(codec : any, commandinitiator: Number): Promise<Number> {
		return GetCommunicationBoardReportIntervalI(codec, {
				commandinitiator: commandinitiator
		});
	}

	export function SetCommunicationBoardReportIntervalI(codec : any, args : tInSetCommunicationBoardReportInterval): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetCommunicationBoardReportInterval(commandinitiator: ' + __args.commandinitiator+ ',pincode: ' + __args.pincode+ ',interval: ' + __args.interval+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetCommunicationBoardReportInterval(codec : any, commandinitiator: Number, pincode: Number, interval: Number): Promise<Number> {
		return SetCommunicationBoardReportIntervalI(codec, {
				commandinitiator: commandinitiator,
				pincode: pincode,
				interval: interval
		});
	}

	export function GetCommunicationBoardSettingsI(codec : any, args : tInGetCommunicationBoardSettings): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetCommunicationBoardSettings(commandinitiator: ' + __args.commandinitiator+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetCommunicationBoardSettings(codec : any, commandinitiator: Number): Promise<Number> {
		return GetCommunicationBoardSettingsI(codec, {
				commandinitiator: commandinitiator
		});
	}

	export function SetCommunicationBoardSettingsI(codec : any, args : tInSetCommunicationBoardSettings): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetCommunicationBoardSettings(commandinitiator: ' + __args.commandinitiator+ ',pincode: ' + __args.pincode+ ',trackerpowermode: ' + __args.trackerpowermode+ ',disablecominterface: ' + __args.disablecominterface+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetCommunicationBoardSettings(codec : any, commandinitiator: Number, pincode: Number, trackerpowermode: Number, disablecominterface: Number): Promise<Number> {
		return SetCommunicationBoardSettingsI(codec, {
				commandinitiator: commandinitiator,
				pincode: pincode,
				trackerpowermode: trackerpowermode,
				disablecominterface: disablecominterface
		});
	}

	export function GetGeofenceI(codec : any, args : tInGetGeofence): Promise<tOutGetGeofence> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetGeofence(commandinitiator: ' + __args.commandinitiator+ ')');
		} catch(error) {
			return new Promise<tOutGetGeofence>((res,reject) => { reject(error);});
		}
	}

	export function GetGeofence(codec : any, commandinitiator: Number): Promise<tOutGetGeofence> {
		return GetGeofenceI(codec, {
				commandinitiator: commandinitiator
		});
	}

	export function SetGeofenceI(codec : any, args : tInSetGeofence): Promise<tOutSetGeofence> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetGeofence(commandinitiator: ' + __args.commandinitiator+ ',pincode: ' + __args.pincode+ ',latitudedegree: ' + __args.latitudedegree+ ',latitudeminute: ' + __args.latitudeminute+ ',latitudedecimalminute: ' + __args.latitudedecimalminute+ ',northsouth: ' + __args.northsouth+ ',longitudedegree: ' + __args.longitudedegree+ ',longitudeminute: ' + __args.longitudeminute+ ',longitudedecimalminute: ' + __args.longitudedecimalminute+ ',eastwest: ' + __args.eastwest+ ',altitude: ' + __args.altitude+ ')');
		} catch(error) {
			return new Promise<tOutSetGeofence>((res,reject) => { reject(error);});
		}
	}

	export function SetGeofence(codec : any, commandinitiator: Number, pincode: Number, latitudedegree: Number, latitudeminute: Number, latitudedecimalminute: Number, northsouth: Number, longitudedegree: Number, longitudeminute: Number, longitudedecimalminute: Number, eastwest: Number, altitude: Number): Promise<tOutSetGeofence> {
		return SetGeofenceI(codec, {
				commandinitiator: commandinitiator,
				pincode: pincode,
				latitudedegree: latitudedegree,
				latitudeminute: latitudeminute,
				latitudedecimalminute: latitudedecimalminute,
				northsouth: northsouth,
				longitudedegree: longitudedegree,
				longitudeminute: longitudeminute,
				longitudedecimalminute: longitudedecimalminute,
				eastwest: eastwest,
				altitude: altitude
		});
	}

	export function GetGeofenceSensitivityI(codec : any, args : tInGetGeofenceSensitivity): Promise<tOutGetGeofenceSensitivity> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetGeofenceSensitivity(commandinitiator: ' + __args.commandinitiator+ ')');
		} catch(error) {
			return new Promise<tOutGetGeofenceSensitivity>((res,reject) => { reject(error);});
		}
	}

	export function GetGeofenceSensitivity(codec : any, commandinitiator: Number): Promise<tOutGetGeofenceSensitivity> {
		return GetGeofenceSensitivityI(codec, {
				commandinitiator: commandinitiator
		});
	}

	export function SetGeofenceSensitivityI(codec : any, args : tInSetGeofenceSensitivity): Promise<tOutSetGeofenceSensitivity> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetGeofenceSensitivity(commandinitiator: ' + __args.commandinitiator+ ',pincode: ' + __args.pincode+ ',sesitivity: ' + __args.sesitivity+ ',geofenceradius: ' + __args.geofenceradius+ ',timeoutside: ' + __args.timeoutside+ ')');
		} catch(error) {
			return new Promise<tOutSetGeofenceSensitivity>((res,reject) => { reject(error);});
		}
	}

	export function SetGeofenceSensitivity(codec : any, commandinitiator: Number, pincode: Number, sesitivity: Number, geofenceradius: Number, timeoutside: Number): Promise<tOutSetGeofenceSensitivity> {
		return SetGeofenceSensitivityI(codec, {
				commandinitiator: commandinitiator,
				pincode: pincode,
				sesitivity: sesitivity,
				geofenceradius: geofenceradius,
				timeoutside: timeoutside
		});
	}

	export function GetTrackerDNSName(codec : any): Promise<tOutGetTrackerDNSName> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetTrackerDNSName()');
		} catch(error) {
			return new Promise<tOutGetTrackerDNSName>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackerDNSNameI(codec : any, args : tInSetTrackerDNSName): Promise<tOutSetTrackerDNSName> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetTrackerDNSName(pin: ' + __args.pin+ ',port: ' + __args.port+ ',dnsname: ' + __args.dnsname+ ')');
		} catch(error) {
			return new Promise<tOutSetTrackerDNSName>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackerDNSName(codec : any, pin: Number, port: Number, dnsname: String): Promise<tOutSetTrackerDNSName> {
		return SetTrackerDNSNameI(codec, {
				pin: pin,
				port: port,
				dnsname: dnsname
		});
	}

	export function GetComBoardSecondDNSName(codec : any): Promise<tOutGetComBoardSecondDNSName> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetComBoardSecondDNSName()');
		} catch(error) {
			return new Promise<tOutGetComBoardSecondDNSName>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardSecondDNSNameI(codec : any, args : tInSetComBoardSecondDNSName): Promise<tOutSetComBoardSecondDNSName> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetComBoardSecondDNSName(pin: ' + __args.pin+ ',port: ' + __args.port+ ',dnsname: ' + __args.dnsname+ ')');
		} catch(error) {
			return new Promise<tOutSetComBoardSecondDNSName>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardSecondDNSName(codec : any, pin: Number, port: Number, dnsname: String): Promise<tOutSetComBoardSecondDNSName> {
		return SetComBoardSecondDNSNameI(codec, {
				pin: pin,
				port: port,
				dnsname: dnsname
		});
	}

	export function GetTrackerPhonenumberI(codec : any, args : tInGetTrackerPhonenumber): Promise<void> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetTrackerPhonenumber(commandinitiator: ' + __args.commandinitiator+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetTrackerPhonenumber(codec : any, commandinitiator: Number): Promise<void> {
		return GetTrackerPhonenumberI(codec, {
				commandinitiator: commandinitiator
		});
	}

	export function SetTrackerPhonenumberI(codec : any, args : tInSetTrackerPhonenumber): Promise<void> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetTrackerPhonenumber(commandinitiator: ' + __args.commandinitiator+ ',pincode: ' + __args.pincode+ ',phonenumberindex: ' + __args.phonenumberindex+ ',phonenumber: ' + __args.phonenumber+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackerPhonenumber(codec : any, commandinitiator: Number, pincode: Number, phonenumberindex: Number, phonenumber: String): Promise<void> {
		return SetTrackerPhonenumberI(codec, {
				commandinitiator: commandinitiator,
				pincode: pincode,
				phonenumberindex: phonenumberindex,
				phonenumber: phonenumber
		});
	}

	export function GetTime(codec : any): Promise<tOutGetTime> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetTime()');
		} catch(error) {
			return new Promise<tOutGetTime>((res,reject) => { reject(error);});
		}
	}

	export function GetDate(codec : any): Promise<tOutGetDate> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetDate()');
		} catch(error) {
			return new Promise<tOutGetDate>((res,reject) => { reject(error);});
		}
	}

	export function GetMmiSettings(codec : any): Promise<tOutGetMmiSettings> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetMmiSettings()');
		} catch(error) {
			return new Promise<tOutGetMmiSettings>((res,reject) => { reject(error);});
		}
	}

	export function GetSoundSettings(codec : any): Promise<tOutGetSoundSettings> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetSoundSettings()');
		} catch(error) {
			return new Promise<tOutGetSoundSettings>((res,reject) => { reject(error);});
		}
	}

	export function GetSecuritySettings(codec : any): Promise<tOutGetSecuritySettings> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetSecuritySettings()');
		} catch(error) {
			return new Promise<tOutGetSecuritySettings>((res,reject) => { reject(error);});
		}
	}

	export function GetUserSettings(codec : any): Promise<tOutGetUserSettings> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetUserSettings()');
		} catch(error) {
			return new Promise<tOutGetUserSettings>((res,reject) => { reject(error);});
		}
	}

	export function GetDemoMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetDemoMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetLoopDetection(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetLoopDetection()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetLoopPeriodTime(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetLoopPeriodTime()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPin(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetPin()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPin2(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetPin2()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPinSecurityCode(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetPinSecurityCode()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function GetPin2SecurityCode(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetPin2SecurityCode()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function GetEcoMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetEcoMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetCuttingHeight(codec : any): Promise<tOutGetCuttingHeight> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetCuttingHeight()');
		} catch(error) {
			return new Promise<tOutGetCuttingHeight>((res,reject) => { reject(error);});
		}
	}

	export function GetHeadlightEnabled(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetHeadlightEnabled()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetUserSettingsNameI(codec : any, args : tInGetUserSettingsName): Promise<tOutGetUserSettingsName> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetUserSettingsName(userSettingsIndex: ' + __args.userSettingsIndex+ ')');
		} catch(error) {
			return new Promise<tOutGetUserSettingsName>((res,reject) => { reject(error);});
		}
	}

	export function GetUserSettingsName(codec : any, userSettingsIndex: Number): Promise<tOutGetUserSettingsName> {
		return GetUserSettingsNameI(codec, {
				userSettingsIndex: userSettingsIndex
		});
	}

	export function GetTimestampLastReminder(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SystemSettings.GetTimestampLastReminder()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetConfigChangeCounterI(codec : any, args : tInGetConfigChangeCounter): Promise<tOutGetConfigChangeCounter> {
		let __args = args;

		try {
			return codec.send('SystemSettings.GetConfigChangeCounter(deviceTypeGroup: ' + __args.deviceTypeGroup+ ',deviceType: ' + __args.deviceType+ ',configChangeCount: ' + __args.configChangeCount+ ')');
		} catch(error) {
			return new Promise<tOutGetConfigChangeCounter>((res,reject) => { reject(error);});
		}
	}

	export function GetConfigChangeCounter(codec : any, deviceTypeGroup: Number, deviceType: Number, configChangeCount: Number): Promise<tOutGetConfigChangeCounter> {
		return GetConfigChangeCounterI(codec, {
				deviceTypeGroup: deviceTypeGroup,
				deviceType: deviceType,
				configChangeCount: configChangeCount
		});
	}

	export function SetTimeI(codec : any, args : tInSetTime): Promise<tOutSetTime> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetTime(hour: ' + __args.hour+ ',minute: ' + __args.minute+ ',second: ' + __args.second+ ')');
		} catch(error) {
			return new Promise<tOutSetTime>((res,reject) => { reject(error);});
		}
	}

	export function SetTime(codec : any, hour: Number, minute: Number, second: Number): Promise<tOutSetTime> {
		return SetTimeI(codec, {
				hour: hour,
				minute: minute,
				second: second
		});
	}

	export function SetDateI(codec : any, args : tInSetDate): Promise<tOutSetDate> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetDate(year: ' + __args.year+ ',month: ' + __args.month+ ',date: ' + __args.date+ ',dateTimeFormat: ' + __args.dateTimeFormat+ ')');
		} catch(error) {
			return new Promise<tOutSetDate>((res,reject) => { reject(error);});
		}
	}

	export function SetDate(codec : any, year: Number, month: Number, date: Number, dateTimeFormat: Number): Promise<tOutSetDate> {
		return SetDateI(codec, {
				year: year,
				month: month,
				date: date,
				dateTimeFormat: dateTimeFormat
		});
	}

	export function SetMmiSettingsI(codec : any, args : tInSetMmiSettings): Promise<tOutSetMmiSettings> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetMmiSettings(language_LCID: ' + __args.language_LCID+ ',messageLevel: ' + __args.messageLevel+ ',userMmiOptions: ' + __args.userMmiOptions+ ',country: ' + __args.country+ ',timeZone: ' + __args.timeZone+ ',systemMmiOptions: ' + __args.systemMmiOptions+ ')');
		} catch(error) {
			return new Promise<tOutSetMmiSettings>((res,reject) => { reject(error);});
		}
	}

	export function SetMmiSettings(codec : any, language_LCID: Number, messageLevel: Number, userMmiOptions: Number, country: Number, timeZone: Number, systemMmiOptions: Number): Promise<tOutSetMmiSettings> {
		return SetMmiSettingsI(codec, {
				language_LCID: language_LCID,
				messageLevel: messageLevel,
				userMmiOptions: userMmiOptions,
				country: country,
				timeZone: timeZone,
				systemMmiOptions: systemMmiOptions
		});
	}

	export function SetSoundSettingsI(codec : any, args : tInSetSoundSettings): Promise<tOutSetSoundSettings> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetSoundSettings(keypadSound: ' + __args.keypadSound+ ',operationSound: ' + __args.operationSound+ ',startupSound: ' + __args.startupSound+ ')');
		} catch(error) {
			return new Promise<tOutSetSoundSettings>((res,reject) => { reject(error);});
		}
	}

	export function SetSoundSettings(codec : any, keypadSound: Number, operationSound: Number, startupSound: Number): Promise<tOutSetSoundSettings> {
		return SetSoundSettingsI(codec, {
				keypadSound: keypadSound,
				operationSound: operationSound,
				startupSound: startupSound
		});
	}

	export function SetSecuritySettingsI(codec : any, args : tInSetSecuritySettings): Promise<tOutSetSecuritySettings> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetSecuritySettings(currentPIN1: ' + __args.currentPIN1+ ',alarmTime: ' + __args.alarmTime+ ',timeLockInterval: ' + __args.timeLockInterval+ ',securityFunctions: ' + __args.securityFunctions+ ')');
		} catch(error) {
			return new Promise<tOutSetSecuritySettings>((res,reject) => { reject(error);});
		}
	}

	export function SetSecuritySettings(codec : any, currentPIN1: Number, alarmTime: Number, timeLockInterval: Number, securityFunctions: Number): Promise<tOutSetSecuritySettings> {
		return SetSecuritySettingsI(codec, {
				currentPIN1: currentPIN1,
				alarmTime: alarmTime,
				timeLockInterval: timeLockInterval,
				securityFunctions: securityFunctions
		});
	}

	export function StoreUserSettingsI(codec : any, args : tInStoreUserSettings): Promise<tOutStoreUserSettings> {
		let __args = args;

		try {
			return codec.send('SystemSettings.StoreUserSettings(userSettingsIndex: ' + __args.userSettingsIndex+ ')');
		} catch(error) {
			return new Promise<tOutStoreUserSettings>((res,reject) => { reject(error);});
		}
	}

	export function StoreUserSettings(codec : any, userSettingsIndex: Number): Promise<tOutStoreUserSettings> {
		return StoreUserSettingsI(codec, {
				userSettingsIndex: userSettingsIndex
		});
	}

	export function SelectUserSettingsI(codec : any, args : tInSelectUserSettings): Promise<tOutSelectUserSettings> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SelectUserSettings(userSettingsIndex: ' + __args.userSettingsIndex+ ',userSettingsInUse: ' + __args.userSettingsInUse+ ')');
		} catch(error) {
			return new Promise<tOutSelectUserSettings>((res,reject) => { reject(error);});
		}
	}

	export function SelectUserSettings(codec : any, userSettingsIndex: Number, userSettingsInUse: Number): Promise<tOutSelectUserSettings> {
		return SelectUserSettingsI(codec, {
				userSettingsIndex: userSettingsIndex,
				userSettingsInUse: userSettingsInUse
		});
	}

	export function SetDemoModeI(codec : any, args : tInSetDemoMode): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetDemoMode(demoMode: ' + __args.demoMode+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetDemoMode(codec : any, demoMode: Number): Promise<Number> {
		return SetDemoModeI(codec, {
				demoMode: demoMode
		});
	}

	export function SetLoopDetectionI(codec : any, args : tInSetLoopDetection): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetLoopDetection(loopDetection: ' + __args.loopDetection+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetLoopDetection(codec : any, loopDetection: Number): Promise<Number> {
		return SetLoopDetectionI(codec, {
				loopDetection: loopDetection
		});
	}

	export function SetLoopPeriodTimeI(codec : any, args : tInSetLoopPeriodTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetLoopPeriodTime(loopPeriodTime: ' + __args.loopPeriodTime+ ',isTemporary: ' + __args.isTemporary+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetLoopPeriodTime(codec : any, loopPeriodTime: Number, isTemporary: Number): Promise<Number> {
		return SetLoopPeriodTimeI(codec, {
				loopPeriodTime: loopPeriodTime,
				isTemporary: isTemporary
		});
	}

	export function SetPinI(codec : any, args : tInSetPin): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetPin(currentPIN: ' + __args.currentPIN+ ',newPIN: ' + __args.newPIN+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetPin(codec : any, currentPIN: Number, newPIN: Number): Promise<Number> {
		return SetPinI(codec, {
				currentPIN: currentPIN,
				newPIN: newPIN
		});
	}

	export function SetPin2I(codec : any, args : tInSetPin2): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetPin2(currentPIN: ' + __args.currentPIN+ ',newPIN: ' + __args.newPIN+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetPin2(codec : any, currentPIN: Number, newPIN: Number): Promise<Number> {
		return SetPin2I(codec, {
				currentPIN: currentPIN,
				newPIN: newPIN
		});
	}

	export function EnterNewStartupSequenceI(codec : any, args : tInEnterNewStartupSequence): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.EnterNewStartupSequence(currentPIN1: ' + __args.currentPIN1+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function EnterNewStartupSequence(codec : any, currentPIN1: Number): Promise<Number> {
		return EnterNewStartupSequenceI(codec, {
				currentPIN1: currentPIN1
		});
	}

	export function SetEcoModeI(codec : any, args : tInSetEcoMode): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetEcoMode(ecoMode: ' + __args.ecoMode+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetEcoMode(codec : any, ecoMode: Number): Promise<Number> {
		return SetEcoModeI(codec, {
				ecoMode: ecoMode
		});
	}

	export function SetCuttingHeightI(codec : any, args : tInSetCuttingHeight): Promise<tOutSetCuttingHeight> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetCuttingHeight(targetHeight: ' + __args.targetHeight+ ',initialHeight: ' + __args.initialHeight+ ',action: ' + __args.action+ ')');
		} catch(error) {
			return new Promise<tOutSetCuttingHeight>((res,reject) => { reject(error);});
		}
	}

	export function SetCuttingHeight(codec : any, targetHeight: Number, initialHeight: Number, action: Number): Promise<tOutSetCuttingHeight> {
		return SetCuttingHeightI(codec, {
				targetHeight: targetHeight,
				initialHeight: initialHeight,
				action: action
		});
	}

	export function SetHeadlightEnabledI(codec : any, args : tInSetHeadlightEnabled): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetHeadlightEnabled(headlight: ' + __args.headlight+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetHeadlightEnabled(codec : any, headlight: Number): Promise<Number> {
		return SetHeadlightEnabledI(codec, {
				headlight: headlight
		});
	}

	export function SetUserSettingsName(codec : any): Promise<tOutSetUserSettingsName> {
		let __args = {};

		try {
			return codec.send('SystemSettings.SetUserSettingsName()');
		} catch(error) {
			return new Promise<tOutSetUserSettingsName>((res,reject) => { reject(error);});
		}
	}

	export function SetTimestampLastReminderI(codec : any, args : tInSetTimestampLastReminder): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetTimestampLastReminder(timestamp: ' + __args.timestamp+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetTimestampLastReminder(codec : any, timestamp: Number): Promise<Number> {
		return SetTimestampLastReminderI(codec, {
				timestamp: timestamp
		});
	}

	export function SetConfigChangeCounterI(codec : any, args : tInSetConfigChangeCounter): Promise<tOutSetConfigChangeCounter> {
		let __args = args;

		try {
			return codec.send('SystemSettings.SetConfigChangeCounter(deviceTypeGroup: ' + __args.deviceTypeGroup+ ',deviceType: ' + __args.deviceType+ ',configChangeCount: ' + __args.configChangeCount+ ')');
		} catch(error) {
			return new Promise<tOutSetConfigChangeCounter>((res,reject) => { reject(error);});
		}
	}

	export function SetConfigChangeCounter(codec : any, deviceTypeGroup: Number, deviceType: Number, configChangeCount: Number): Promise<tOutSetConfigChangeCounter> {
		return SetConfigChangeCounterI(codec, {
				deviceTypeGroup: deviceTypeGroup,
				deviceType: deviceType,
				configChangeCount: configChangeCount
		});
	}
}

export namespace BackendServerdata {
	/**
	 *  Output interface for BackendServerdata.GetMowerStatus
	 */
	export interface tOutGetMowerStatus {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
	}
	/**
	 *  Output interface for BackendServerdata.GetMowerStatusDebug
	 */
	export interface tOutGetMowerStatusDebug {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
		empty: Uint8Array
		debuginfo: Number
	}
	/**
	 *  Input interface for BackendServerdata.SetMowerStatus
	 */
	export interface tInSetMowerStatus {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
	}
	/**
	 *  Input interface for BackendServerdata.SetMowerStatus4
	 */
	export interface tInSetMowerStatus4 {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
	}
	/**
	 *  Input interface for BackendServerdata.SetMowerStatus5
	 */
	export interface tInSetMowerStatus5 {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
	}
	/**
	 *  Input interface for BackendServerdata.SetMowerStatusDebug
	 */
	export interface tInSetMowerStatusDebug {
		latitudedegree: Number
		latitudeminute: Number
		latitudedecimalminute: Number
		longitudedegree: Number
		longitudeminute: Number
		longitudedecimalminute: Number
		hdop: Number
		gpsstatus: Number
		gsmrssi: Number
		mowerstatus: Number
		lasterrorcode: Number
		timestamplasterror: Number
		configchangecounter: Number
		hostmessage: Number
		timestampnextstart: Number
		sourcefornextstart: Number
		batterypercent: Number
		empty: Uint8Array
		debuginfo: Number
	}

	export function GetMowerStatus(codec : any): Promise<tOutGetMowerStatus> {
		let __args = {};

		try {
			return codec.send('BackendServerdata.GetMowerStatus()');
		} catch(error) {
			return new Promise<tOutGetMowerStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetMowerStatusDebug(codec : any): Promise<tOutGetMowerStatusDebug> {
		let __args = {};

		try {
			return codec.send('BackendServerdata.GetMowerStatusDebug()');
		} catch(error) {
			return new Promise<tOutGetMowerStatusDebug>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerStatusI(codec : any, args : tInSetMowerStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('BackendServerdata.SetMowerStatus(latitudedegree: ' + __args.latitudedegree+ ',latitudeminute: ' + __args.latitudeminute+ ',latitudedecimalminute: ' + __args.latitudedecimalminute+ ',longitudedegree: ' + __args.longitudedegree+ ',longitudeminute: ' + __args.longitudeminute+ ',longitudedecimalminute: ' + __args.longitudedecimalminute+ ',hdop: ' + __args.hdop+ ',gpsstatus: ' + __args.gpsstatus+ ',gsmrssi: ' + __args.gsmrssi+ ',mowerstatus: ' + __args.mowerstatus+ ',lasterrorcode: ' + __args.lasterrorcode+ ',timestamplasterror: ' + __args.timestamplasterror+ ',configchangecounter: ' + __args.configchangecounter+ ',hostmessage: ' + __args.hostmessage+ ',timestampnextstart: ' + __args.timestampnextstart+ ',sourcefornextstart: ' + __args.sourcefornextstart+ ',batterypercent: ' + __args.batterypercent+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerStatus(codec : any, latitudedegree: Number, latitudeminute: Number, latitudedecimalminute: Number, longitudedegree: Number, longitudeminute: Number, longitudedecimalminute: Number, hdop: Number, gpsstatus: Number, gsmrssi: Number, mowerstatus: Number, lasterrorcode: Number, timestamplasterror: Number, configchangecounter: Number, hostmessage: Number, timestampnextstart: Number, sourcefornextstart: Number, batterypercent: Number): Promise<void> {
		return SetMowerStatusI(codec, {
				latitudedegree: latitudedegree,
				latitudeminute: latitudeminute,
				latitudedecimalminute: latitudedecimalminute,
				longitudedegree: longitudedegree,
				longitudeminute: longitudeminute,
				longitudedecimalminute: longitudedecimalminute,
				hdop: hdop,
				gpsstatus: gpsstatus,
				gsmrssi: gsmrssi,
				mowerstatus: mowerstatus,
				lasterrorcode: lasterrorcode,
				timestamplasterror: timestamplasterror,
				configchangecounter: configchangecounter,
				hostmessage: hostmessage,
				timestampnextstart: timestampnextstart,
				sourcefornextstart: sourcefornextstart,
				batterypercent: batterypercent
		});
	}

	export function SetMowerStatus4I(codec : any, args : tInSetMowerStatus4): Promise<void> {
		let __args = args;

		try {
			return codec.send('BackendServerdata.SetMowerStatus4(latitudedegree: ' + __args.latitudedegree+ ',latitudeminute: ' + __args.latitudeminute+ ',latitudedecimalminute: ' + __args.latitudedecimalminute+ ',longitudedegree: ' + __args.longitudedegree+ ',longitudeminute: ' + __args.longitudeminute+ ',longitudedecimalminute: ' + __args.longitudedecimalminute+ ',hdop: ' + __args.hdop+ ',gpsstatus: ' + __args.gpsstatus+ ',gsmrssi: ' + __args.gsmrssi+ ',mowerstatus: ' + __args.mowerstatus+ ',lasterrorcode: ' + __args.lasterrorcode+ ',timestamplasterror: ' + __args.timestamplasterror+ ',configchangecounter: ' + __args.configchangecounter+ ',hostmessage: ' + __args.hostmessage+ ',timestampnextstart: ' + __args.timestampnextstart+ ',sourcefornextstart: ' + __args.sourcefornextstart+ ',batterypercent: ' + __args.batterypercent+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerStatus4(codec : any, latitudedegree: Number, latitudeminute: Number, latitudedecimalminute: Number, longitudedegree: Number, longitudeminute: Number, longitudedecimalminute: Number, hdop: Number, gpsstatus: Number, gsmrssi: Number, mowerstatus: Number, lasterrorcode: Number, timestamplasterror: Number, configchangecounter: Number, hostmessage: Number, timestampnextstart: Number, sourcefornextstart: Number, batterypercent: Number): Promise<void> {
		return SetMowerStatus4I(codec, {
				latitudedegree: latitudedegree,
				latitudeminute: latitudeminute,
				latitudedecimalminute: latitudedecimalminute,
				longitudedegree: longitudedegree,
				longitudeminute: longitudeminute,
				longitudedecimalminute: longitudedecimalminute,
				hdop: hdop,
				gpsstatus: gpsstatus,
				gsmrssi: gsmrssi,
				mowerstatus: mowerstatus,
				lasterrorcode: lasterrorcode,
				timestamplasterror: timestamplasterror,
				configchangecounter: configchangecounter,
				hostmessage: hostmessage,
				timestampnextstart: timestampnextstart,
				sourcefornextstart: sourcefornextstart,
				batterypercent: batterypercent
		});
	}

	export function SetMowerStatus5I(codec : any, args : tInSetMowerStatus5): Promise<void> {
		let __args = args;

		try {
			return codec.send('BackendServerdata.SetMowerStatus5(latitudedegree: ' + __args.latitudedegree+ ',latitudeminute: ' + __args.latitudeminute+ ',latitudedecimalminute: ' + __args.latitudedecimalminute+ ',longitudedegree: ' + __args.longitudedegree+ ',longitudeminute: ' + __args.longitudeminute+ ',longitudedecimalminute: ' + __args.longitudedecimalminute+ ',hdop: ' + __args.hdop+ ',gpsstatus: ' + __args.gpsstatus+ ',gsmrssi: ' + __args.gsmrssi+ ',mowerstatus: ' + __args.mowerstatus+ ',lasterrorcode: ' + __args.lasterrorcode+ ',timestamplasterror: ' + __args.timestamplasterror+ ',configchangecounter: ' + __args.configchangecounter+ ',hostmessage: ' + __args.hostmessage+ ',timestampnextstart: ' + __args.timestampnextstart+ ',sourcefornextstart: ' + __args.sourcefornextstart+ ',batterypercent: ' + __args.batterypercent+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerStatus5(codec : any, latitudedegree: Number, latitudeminute: Number, latitudedecimalminute: Number, longitudedegree: Number, longitudeminute: Number, longitudedecimalminute: Number, hdop: Number, gpsstatus: Number, gsmrssi: Number, mowerstatus: Number, lasterrorcode: Number, timestamplasterror: Number, configchangecounter: Number, hostmessage: Number, timestampnextstart: Number, sourcefornextstart: Number, batterypercent: Number): Promise<void> {
		return SetMowerStatus5I(codec, {
				latitudedegree: latitudedegree,
				latitudeminute: latitudeminute,
				latitudedecimalminute: latitudedecimalminute,
				longitudedegree: longitudedegree,
				longitudeminute: longitudeminute,
				longitudedecimalminute: longitudedecimalminute,
				hdop: hdop,
				gpsstatus: gpsstatus,
				gsmrssi: gsmrssi,
				mowerstatus: mowerstatus,
				lasterrorcode: lasterrorcode,
				timestamplasterror: timestamplasterror,
				configchangecounter: configchangecounter,
				hostmessage: hostmessage,
				timestampnextstart: timestampnextstart,
				sourcefornextstart: sourcefornextstart,
				batterypercent: batterypercent
		});
	}

	export function SetMowerStatusDebugI(codec : any, args : tInSetMowerStatusDebug): Promise<void> {
		let __args = args;

		try {
			return codec.send('BackendServerdata.SetMowerStatusDebug(latitudedegree: ' + __args.latitudedegree+ ',latitudeminute: ' + __args.latitudeminute+ ',latitudedecimalminute: ' + __args.latitudedecimalminute+ ',longitudedegree: ' + __args.longitudedegree+ ',longitudeminute: ' + __args.longitudeminute+ ',longitudedecimalminute: ' + __args.longitudedecimalminute+ ',hdop: ' + __args.hdop+ ',gpsstatus: ' + __args.gpsstatus+ ',gsmrssi: ' + __args.gsmrssi+ ',mowerstatus: ' + __args.mowerstatus+ ',lasterrorcode: ' + __args.lasterrorcode+ ',timestamplasterror: ' + __args.timestamplasterror+ ',configchangecounter: ' + __args.configchangecounter+ ',hostmessage: ' + __args.hostmessage+ ',timestampnextstart: ' + __args.timestampnextstart+ ',sourcefornextstart: ' + __args.sourcefornextstart+ ',batterypercent: ' + __args.batterypercent+ ',empty: ' + __args.empty+ ',debuginfo: ' + __args.debuginfo+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerStatusDebug(codec : any, latitudedegree: Number, latitudeminute: Number, latitudedecimalminute: Number, longitudedegree: Number, longitudeminute: Number, longitudedecimalminute: Number, hdop: Number, gpsstatus: Number, gsmrssi: Number, mowerstatus: Number, lasterrorcode: Number, timestamplasterror: Number, configchangecounter: Number, hostmessage: Number, timestampnextstart: Number, sourcefornextstart: Number, batterypercent: Number, empty: Uint8Array, debuginfo: Number): Promise<void> {
		return SetMowerStatusDebugI(codec, {
				latitudedegree: latitudedegree,
				latitudeminute: latitudeminute,
				latitudedecimalminute: latitudedecimalminute,
				longitudedegree: longitudedegree,
				longitudeminute: longitudeminute,
				longitudedecimalminute: longitudedecimalminute,
				hdop: hdop,
				gpsstatus: gpsstatus,
				gsmrssi: gsmrssi,
				mowerstatus: mowerstatus,
				lasterrorcode: lasterrorcode,
				timestamplasterror: timestamplasterror,
				configchangecounter: configchangecounter,
				hostmessage: hostmessage,
				timestampnextstart: timestampnextstart,
				sourcefornextstart: sourcefornextstart,
				batterypercent: batterypercent,
				empty: empty,
				debuginfo: debuginfo
		});
	}
}

export namespace Charginstation {
	/**
	 *  Input interface for Charginstation.SetPeriodTime
	 */
	export interface tInSetPeriodTime {
		periodtime: Number
	}
	/**
	 *  Input interface for Charginstation.SetActivatedPulsTemp
	 */
	export interface tInSetActivatedPulsTemp {
		activatedpulses: Number
	}
	/**
	 *  Input interface for Charginstation.SetDefaultAndCurrentPulses
	 */
	export interface tInSetDefaultAndCurrentPulses {
		activatedpulses: Number
	}
	/**
	 *  Input interface for Charginstation.SetMessageMowerParked
	 */
	export interface tInSetMessageMowerParked {
		messageid: Number
		deviceid: Number
		size: Number
		numberofbytes: Number
		data: Number
	}
	/**
	 *  Input interface for Charginstation.SetParkFunction
	 */
	export interface tInSetParkFunction {
		park: Number
	}

	export function SetPeriodTimeI(codec : any, args : tInSetPeriodTime): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charginstation.SetPeriodTime(periodtime: ' + __args.periodtime+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPeriodTime(codec : any, periodtime: Number): Promise<void> {
		return SetPeriodTimeI(codec, {
				periodtime: periodtime
		});
	}

	export function SetActivatedPulsTempI(codec : any, args : tInSetActivatedPulsTemp): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charginstation.SetActivatedPulsTemp(activatedpulses: ' + __args.activatedpulses+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetActivatedPulsTemp(codec : any, activatedpulses: Number): Promise<void> {
		return SetActivatedPulsTempI(codec, {
				activatedpulses: activatedpulses
		});
	}

	export function SetDefaultAndCurrentPulsesI(codec : any, args : tInSetDefaultAndCurrentPulses): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charginstation.SetDefaultAndCurrentPulses(activatedpulses: ' + __args.activatedpulses+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetDefaultAndCurrentPulses(codec : any, activatedpulses: Number): Promise<void> {
		return SetDefaultAndCurrentPulsesI(codec, {
				activatedpulses: activatedpulses
		});
	}

	export function SetMessageMowerParkedI(codec : any, args : tInSetMessageMowerParked): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charginstation.SetMessageMowerParked(messageid: ' + __args.messageid+ ',deviceid: ' + __args.deviceid+ ',size: ' + __args.size+ ',numberofbytes: ' + __args.numberofbytes+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMessageMowerParked(codec : any, messageid: Number, deviceid: Number, size: Number, numberofbytes: Number, data: Number): Promise<void> {
		return SetMessageMowerParkedI(codec, {
				messageid: messageid,
				deviceid: deviceid,
				size: size,
				numberofbytes: numberofbytes,
				data: data
		});
	}

	export function SetParkFunctionI(codec : any, args : tInSetParkFunction): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charginstation.SetParkFunction(park: ' + __args.park+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetParkFunction(codec : any, park: Number): Promise<void> {
		return SetParkFunctionI(codec, {
				park: park
		});
	}

	export function SetSendApplicationSWVersion(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Charginstation.SetSendApplicationSWVersion()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}
}

export namespace CommunicationBoardCommands {
	/**
	 *  Input interface for CommunicationBoardCommands.SetFactorySettingsAll
	 */
	export interface tInSetFactorySettingsAll {
		pincode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetFactorySettingsAllConstants
	 */
	export interface tInSetFactorySettingsAllConstants {
		pincode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetFactorySettingsConstants
	 */
	export interface tInSetFactorySettingsConstants {
		pincode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetFactorySettingsSystemSettings
	 */
	export interface tInSetFactorySettingsSystemSettings {
		pincode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetFactorySettingsUserSettings
	 */
	export interface tInSetFactorySettingsUserSettings {
		pincode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetPhonenumberTest
	 */
	export interface tInSetPhonenumberTest {
		number: Number
	}
	/**
	 *  Output interface for CommunicationBoardCommands.SendAnyAtCommand
	 */
	export interface tOutSendAnyAtCommand {
		length: Number
		commandstr: String
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SendAnyAtCommand
	 */
	export interface tInSendAnyAtCommand {
		target: Number
		length: Number
		commandstr: String
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetPinPukCode
	 */
	export interface tInSetPinPukCode {
		ispin: Number
		lenght: Number
		code: String
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetGenerateLogMessageComboard
	 */
	export interface tInSetGenerateLogMessageComboard {
		severity: Number
		generatedmessagecode: Number
	}
	/**
	 *  Input interface for CommunicationBoardCommands.SetRadiomoduleStatus
	 */
	export interface tInSetRadiomoduleStatus {
		connectionstatus: Number
		signalquality: Number
		wirelesslinkid: Number
	}
	/**
	 *  Output interface for CommunicationBoardCommands.GetComboardBitResult
	 */
	export interface tOutGetComboardBitResult {
		bitresult: Number
		comboardbitfailed: Number
	}

	export function SetFactorySettingsAllI(codec : any, args : tInSetFactorySettingsAll): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetFactorySettingsAll(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetFactorySettingsAll(codec : any, pincode: Number): Promise<void> {
		return SetFactorySettingsAllI(codec, {
				pincode: pincode
		});
	}

	export function SetFactorySettingsAllConstantsI(codec : any, args : tInSetFactorySettingsAllConstants): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetFactorySettingsAllConstants(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetFactorySettingsAllConstants(codec : any, pincode: Number): Promise<void> {
		return SetFactorySettingsAllConstantsI(codec, {
				pincode: pincode
		});
	}

	export function SetFactorySettingsConstantsI(codec : any, args : tInSetFactorySettingsConstants): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetFactorySettingsConstants(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetFactorySettingsConstants(codec : any, pincode: Number): Promise<void> {
		return SetFactorySettingsConstantsI(codec, {
				pincode: pincode
		});
	}

	export function SetFactorySettingsSystemSettingsI(codec : any, args : tInSetFactorySettingsSystemSettings): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetFactorySettingsSystemSettings(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetFactorySettingsSystemSettings(codec : any, pincode: Number): Promise<void> {
		return SetFactorySettingsSystemSettingsI(codec, {
				pincode: pincode
		});
	}

	export function SetFactorySettingsUserSettingsI(codec : any, args : tInSetFactorySettingsUserSettings): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetFactorySettingsUserSettings(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetFactorySettingsUserSettings(codec : any, pincode: Number): Promise<void> {
		return SetFactorySettingsUserSettingsI(codec, {
				pincode: pincode
		});
	}

	export function GetGSMOperatorName(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('CommunicationBoardCommands.GetGSMOperatorName()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetPhonenumberTestI(codec : any, args : tInSetPhonenumberTest): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetPhonenumberTest(number: ' + __args.number+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPhonenumberTest(codec : any, number: Number): Promise<void> {
		return SetPhonenumberTestI(codec, {
				number: number
		});
	}

	export function SendAnyAtCommandI(codec : any, args : tInSendAnyAtCommand): Promise<tOutSendAnyAtCommand> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SendAnyAtCommand(target: ' + __args.target+ ',length: ' + __args.length+ ',commandstr: ' + __args.commandstr+ ')');
		} catch(error) {
			return new Promise<tOutSendAnyAtCommand>((res,reject) => { reject(error);});
		}
	}

	export function SendAnyAtCommand(codec : any, target: Number, length: Number, commandstr: String): Promise<tOutSendAnyAtCommand> {
		return SendAnyAtCommandI(codec, {
				target: target,
				length: length,
				commandstr: commandstr
		});
	}

	export function SetPinPukCodeI(codec : any, args : tInSetPinPukCode): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetPinPukCode(ispin: ' + __args.ispin+ ',lenght: ' + __args.lenght+ ',code: ' + __args.code+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPinPukCode(codec : any, ispin: Number, lenght: Number, code: String): Promise<void> {
		return SetPinPukCodeI(codec, {
				ispin: ispin,
				lenght: lenght,
				code: code
		});
	}

	export function GetSimCardStatus(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('CommunicationBoardCommands.GetSimCardStatus()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetTiltSensor(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('CommunicationBoardCommands.SetTiltSensor()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetGenerateLogMessageComboardI(codec : any, args : tInSetGenerateLogMessageComboard): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetGenerateLogMessageComboard(severity: ' + __args.severity+ ',generatedmessagecode: ' + __args.generatedmessagecode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetGenerateLogMessageComboard(codec : any, severity: Number, generatedmessagecode: Number): Promise<void> {
		return SetGenerateLogMessageComboardI(codec, {
				severity: severity,
				generatedmessagecode: generatedmessagecode
		});
	}

	export function SetRadiomoduleStatusI(codec : any, args : tInSetRadiomoduleStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationBoardCommands.SetRadiomoduleStatus(connectionstatus: ' + __args.connectionstatus+ ',signalquality: ' + __args.signalquality+ ',wirelesslinkid: ' + __args.wirelesslinkid+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetRadiomoduleStatus(codec : any, connectionstatus: Number, signalquality: Number, wirelesslinkid: Number): Promise<void> {
		return SetRadiomoduleStatusI(codec, {
				connectionstatus: connectionstatus,
				signalquality: signalquality,
				wirelesslinkid: wirelesslinkid
		});
	}

	export function GetComboardBitResult(codec : any): Promise<tOutGetComboardBitResult> {
		let __args = {};

		try {
			return codec.send('CommunicationBoardCommands.GetComboardBitResult()');
		} catch(error) {
			return new Promise<tOutGetComboardBitResult>((res,reject) => { reject(error);});
		}
	}
}

export namespace CommunicationSettings {
	/**
	 *  Input interface for CommunicationSettings.SetBaudRate
	 */
	export interface tInSetBaudRate {
		baudrate: Number
		rts: Number
		port: Number
	}

	export function SetBaudRateI(codec : any, args : tInSetBaudRate): Promise<void> {
		let __args = args;

		try {
			return codec.send('CommunicationSettings.SetBaudRate(baudrate: ' + __args.baudrate+ ',rts: ' + __args.rts+ ',port: ' + __args.port+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetBaudRate(codec : any, baudrate: Number, rts: Number, port: Number): Promise<void> {
		return SetBaudRateI(codec, {
				baudrate: baudrate,
				rts: rts,
				port: port
		});
	}
}

export namespace ConnectToServer {
	/**
	 *  Input interface for ConnectToServer.GetConnectRequest
	 */
	export interface tInGetConnectRequest {
		trackersw: Number
	}

	export function GetConnectRequestI(codec : any, args : tInGetConnectRequest): Promise<void> {
		let __args = args;

		try {
			return codec.send('ConnectToServer.GetConnectRequest(trackersw: ' + __args.trackersw+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetConnectRequest(codec : any, trackersw: Number): Promise<void> {
		return GetConnectRequestI(codec, {
				trackersw: trackersw
		});
	}
}

export namespace ControlOfRecording {
	/**
	 *  Output interface for ControlOfRecording.GetRecordingOptions
	 */
	export interface tOutGetRecordingOptions {
		parameter: Number
		realtime: Number
		trigcheck: Number
		options: Number
	}
	/**
	 *  Output interface for ControlOfRecording.SetRecordingOptions
	 */
	export interface tOutSetRecordingOptions {
		parameter: Number
		realtime: Number
		trigcheck: Number
		options: Number
	}
	/**
	 *  Input interface for ControlOfRecording.SetRecordingOptions
	 */
	export interface tInSetRecordingOptions {
		parameter: Number
		realtime: Number
		trigcheck: Number
		options: Number
	}
	/**
	 *  Output interface for ControlOfRecording.GetRecordingStatus
	 */
	export interface tOutGetRecordingStatus {
		recordingonoff: Number
		logbuffersize: Number
		noofparameterrecords: Number
		noofrealtimedatarecords: Number
		nooftrigrecords: Number
		totalbuffersize: Number
	}
	/**
	 *  Output interface for ControlOfRecording.SetRecordingStatus
	 */
	export interface tOutSetRecordingStatus {
		recordingonoff: Number
		logbuffersize: Number
		noofparameterrecords: Number
		noofrealtimedatarecords: Number
		nooftrigrecords: Number
		totalbuffersize: Number
	}
	/**
	 *  Input interface for ControlOfRecording.SetRecordingStatus
	 */
	export interface tInSetRecordingStatus {
		recordingonoff: Number
		logbuffersize: Number
		noofparameterrecords: Number
		noofrealtimedatarecords: Number
		nooftrigrecords: Number
		totalbuffersize: Number
	}

	export function GetRecordingOptions(codec : any): Promise<tOutGetRecordingOptions> {
		let __args = {};

		try {
			return codec.send('ControlOfRecording.GetRecordingOptions()');
		} catch(error) {
			return new Promise<tOutGetRecordingOptions>((res,reject) => { reject(error);});
		}
	}

	export function SetRecordingOptionsI(codec : any, args : tInSetRecordingOptions): Promise<tOutSetRecordingOptions> {
		let __args = args;

		try {
			return codec.send('ControlOfRecording.SetRecordingOptions(parameter: ' + __args.parameter+ ',realtime: ' + __args.realtime+ ',trigcheck: ' + __args.trigcheck+ ',options: ' + __args.options+ ')');
		} catch(error) {
			return new Promise<tOutSetRecordingOptions>((res,reject) => { reject(error);});
		}
	}

	export function SetRecordingOptions(codec : any, parameter: Number, realtime: Number, trigcheck: Number, options: Number): Promise<tOutSetRecordingOptions> {
		return SetRecordingOptionsI(codec, {
				parameter: parameter,
				realtime: realtime,
				trigcheck: trigcheck,
				options: options
		});
	}

	export function GetRecordingStatus(codec : any): Promise<tOutGetRecordingStatus> {
		let __args = {};

		try {
			return codec.send('ControlOfRecording.GetRecordingStatus()');
		} catch(error) {
			return new Promise<tOutGetRecordingStatus>((res,reject) => { reject(error);});
		}
	}

	export function SetRecordingStatusI(codec : any, args : tInSetRecordingStatus): Promise<tOutSetRecordingStatus> {
		let __args = args;

		try {
			return codec.send('ControlOfRecording.SetRecordingStatus(recordingonoff: ' + __args.recordingonoff+ ',logbuffersize: ' + __args.logbuffersize+ ',noofparameterrecords: ' + __args.noofparameterrecords+ ',noofrealtimedatarecords: ' + __args.noofrealtimedatarecords+ ',nooftrigrecords: ' + __args.nooftrigrecords+ ',totalbuffersize: ' + __args.totalbuffersize+ ')');
		} catch(error) {
			return new Promise<tOutSetRecordingStatus>((res,reject) => { reject(error);});
		}
	}

	export function SetRecordingStatus(codec : any, recordingonoff: Number, logbuffersize: Number, noofparameterrecords: Number, noofrealtimedatarecords: Number, nooftrigrecords: Number, totalbuffersize: Number): Promise<tOutSetRecordingStatus> {
		return SetRecordingStatusI(codec, {
				recordingonoff: recordingonoff,
				logbuffersize: logbuffersize,
				noofparameterrecords: noofparameterrecords,
				noofrealtimedatarecords: noofrealtimedatarecords,
				nooftrigrecords: nooftrigrecords,
				totalbuffersize: totalbuffersize
		});
	}
}

export namespace DebugMessage {
	/**
	 *  Input interface for DebugMessage.SetDebugMessage
	 */
	export interface tInSetDebugMessage {
		dataformat: Number
		data: Uint8Array
	}

	export function SetDebugMessageI(codec : any, args : tInSetDebugMessage): Promise<void> {
		let __args = args;

		try {
			return codec.send('DebugMessage.SetDebugMessage(dataformat: ' + __args.dataformat+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetDebugMessage(codec : any, dataformat: Number, data: Uint8Array): Promise<void> {
		return SetDebugMessageI(codec, {
				dataformat: dataformat,
				data: data
		});
	}
}

export namespace EventsToDebugChannel {
	/**
	 *  Input interface for EventsToDebugChannel.SetDebugChannel
	 */
	export interface tInSetDebugChannel {
		debugch: Number
		loglevel: Number
		swmodule: Number
	}

	export function SetDebugChannelI(codec : any, args : tInSetDebugChannel): Promise<Number> {
		let __args = args;

		try {
			return codec.send('EventsToDebugChannel.SetDebugChannel(debugch: ' + __args.debugch+ ',loglevel: ' + __args.loglevel+ ',swmodule: ' + __args.swmodule+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetDebugChannel(codec : any, debugch: Number, loglevel: Number, swmodule: Number): Promise<Number> {
		return SetDebugChannelI(codec, {
				debugch: debugch,
				loglevel: loglevel,
				swmodule: swmodule
		});
	}
}

export namespace GardenSimulator {
	/**
	 *  Output interface for GardenSimulator.SetSimulator
	 */
	export interface tOutSetSimulator {
		rightwheeltime: Number
		leftwheeltime: Number
		rightwheeldistance: Number
		leftwheeldistance: Number
		state: Number
		substate: Number
		options: Number
	}
	/**
	 *  Input interface for GardenSimulator.SetSimulator
	 */
	export interface tInSetSimulator {
		id: Number
		value: Number
	}

	export function SetSimulatorI(codec : any, args : tInSetSimulator): Promise<tOutSetSimulator> {
		let __args = args;

		try {
			return codec.send('GardenSimulator.SetSimulator(id: ' + __args.id+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<tOutSetSimulator>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulator(codec : any, id: Number, value: Number): Promise<tOutSetSimulator> {
		return SetSimulatorI(codec, {
				id: id,
				value: value
		});
	}
}

export namespace GPSMapCommands {
	/**
	 *  Input interface for GPSMapCommands.GetGPSMapBlockData
	 */
	export interface tInGetGPSMapBlockData {
		index: Number
		offset: Number
		size: Number
	}
	/**
	 *  Output interface for GPSMapCommands.GetGPSMapStructure
	 */
	export interface tOutGetGPSMapStructure {
		gardensize: Number
		blocksize: Number
		usedblocks: Number
		scale: Number
	}
	/**
	 *  Input interface for GPSMapCommands.GetGPSMemoryGet
	 */
	export interface tInGetGPSMemoryGet {
		offset: Number
		size: Number
	}
	/**
	 *  Input interface for GPSMapCommands.SetGPSMemoryGet
	 */
	export interface tInSetGPSMemoryGet {
		offset: Number
		data: Uint8Array
	}
	/**
	 *  Input interface for GPSMapCommands.GetGPSWireData
	 */
	export interface tInGetGPSWireData {
		loopwire: Number
		offset: Number
		size: Number
	}
	/**
	 *  Output interface for GPSMapCommands.GetReadGPSMapCSPosition
	 */
	export interface tOutGetReadGPSMapCSPosition {
		xpos: Number
		ypos: Number
	}
	/**
	 *  Output interface for GPSMapCommands.GetWayToStartPosition
	 */
	export interface tOutGetWayToStartPosition {
		leavemethod: Number
		distanceangle: Number
	}

	export function SetCalculateAndFilterMapData(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.SetCalculateAndFilterMapData()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSMapBlockDataI(codec : any, args : tInGetGPSMapBlockData): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('GPSMapCommands.GetGPSMapBlockData(index: ' + __args.index+ ',offset: ' + __args.offset+ ',size: ' + __args.size+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSMapBlockData(codec : any, index: Number, offset: Number, size: Number): Promise<Uint8Array> {
		return GetGPSMapBlockDataI(codec, {
				index: index,
				offset: offset,
				size: size
		});
	}

	export function GetGPSMapStructure(codec : any): Promise<tOutGetGPSMapStructure> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetGPSMapStructure()');
		} catch(error) {
			return new Promise<tOutGetGPSMapStructure>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSMemoryGetI(codec : any, args : tInGetGPSMemoryGet): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('GPSMapCommands.GetGPSMemoryGet(offset: ' + __args.offset+ ',size: ' + __args.size+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSMemoryGet(codec : any, offset: Number, size: Number): Promise<Uint8Array> {
		return GetGPSMemoryGetI(codec, {
				offset: offset,
				size: size
		});
	}

	export function SetGPSMemoryGetI(codec : any, args : tInSetGPSMemoryGet): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('GPSMapCommands.SetGPSMemoryGet(offset: ' + __args.offset+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function SetGPSMemoryGet(codec : any, offset: Number, data: Uint8Array): Promise<Uint8Array> {
		return SetGPSMemoryGetI(codec, {
				offset: offset,
				data: data
		});
	}

	export function GetGPSMemorySize(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetGPSMemorySize()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSWireDataI(codec : any, args : tInGetGPSWireData): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('GPSMapCommands.GetGPSWireData(loopwire: ' + __args.loopwire+ ',offset: ' + __args.offset+ ',size: ' + __args.size+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSWireData(codec : any, loopwire: Number, offset: Number, size: Number): Promise<Uint8Array> {
		return GetGPSWireDataI(codec, {
				loopwire: loopwire,
				offset: offset,
				size: size
		});
	}

	export function GetGPSWireList(codec : any): Promise<Uint8Array> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetGPSWireList()');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function GetMapBlockList(codec : any): Promise<Uint8Array> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetMapBlockList()');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function SetReadGPSEraseMemory(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.SetReadGPSEraseMemory()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetReadGPSMapCSPosition(codec : any): Promise<tOutGetReadGPSMapCSPosition> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetReadGPSMapCSPosition()');
		} catch(error) {
			return new Promise<tOutGetReadGPSMapCSPosition>((res,reject) => { reject(error);});
		}
	}

	export function SetReadGPSMapFromFlash(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.SetReadGPSMapFromFlash()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ResetGPSMap(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.ResetGPSMap()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSaveGPSMapToFlash(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.SetSaveGPSMapToFlash()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetWayToStartPosition(codec : any): Promise<tOutGetWayToStartPosition> {
		let __args = {};

		try {
			return codec.send('GPSMapCommands.GetWayToStartPosition()');
		} catch(error) {
			return new Promise<tOutGetWayToStartPosition>((res,reject) => { reject(error);});
		}
	}
}

export namespace HandleCommunicationLink {
	/**
	 *  Input interface for HandleCommunicationLink.GetPairingcodeHost
	 */
	export interface tInGetPairingcodeHost {
		pin: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.SetGetPairingcodeHost
	 */
	export interface tInSetGetPairingcodeHost {
		pairingcode: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.SetPairingRequest
	 */
	export interface tInSetPairingRequest {
		pincode: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.SetPairingResultHost
	 */
	export interface tInSetPairingResultHost {
		result: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.SetRemoveAllPairingHost
	 */
	export interface tInSetRemoveAllPairingHost {
		pin: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.SetRemoveAllPairingResult
	 */
	export interface tInSetRemoveAllPairingResult {
		result: Number
	}
	/**
	 *  Input interface for HandleCommunicationLink.GetTransferPairingResult
	 */
	export interface tInGetTransferPairingResult {
		result: Number
	}

	export function SetDisconnectCommunicationLink(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.SetDisconnectCommunicationLink()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetPairingCode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.GetPairingCode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetHeartbeat(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.SetHeartbeat()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetPairingcodeHostI(codec : any, args : tInGetPairingcodeHost): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.GetPairingcodeHost(pin: ' + __args.pin+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPairingcodeHost(codec : any, pin: Number): Promise<Number> {
		return GetPairingcodeHostI(codec, {
				pin: pin
		});
	}

	export function SetGetPairingcodeHostI(codec : any, args : tInSetGetPairingcodeHost): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.SetGetPairingcodeHost(pairingcode: ' + __args.pairingcode+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetGetPairingcodeHost(codec : any, pairingcode: Number): Promise<Number> {
		return SetGetPairingcodeHostI(codec, {
				pairingcode: pairingcode
		});
	}

	export function SetPairingRequestI(codec : any, args : tInSetPairingRequest): Promise<void> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.SetPairingRequest(pincode: ' + __args.pincode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPairingRequest(codec : any, pincode: Number): Promise<void> {
		return SetPairingRequestI(codec, {
				pincode: pincode
		});
	}

	export function GetPairingResultHost(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.GetPairingResultHost()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetPairingResultHostI(codec : any, args : tInSetPairingResultHost): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.SetPairingResultHost(result: ' + __args.result+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetPairingResultHost(codec : any, result: Number): Promise<Number> {
		return SetPairingResultHostI(codec, {
				result: result
		});
	}

	export function SetRemoveAllPairing(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.SetRemoveAllPairing()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetRemoveAllPairingHostI(codec : any, args : tInSetRemoveAllPairingHost): Promise<void> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.SetRemoveAllPairingHost(pin: ' + __args.pin+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetRemoveAllPairingHost(codec : any, pin: Number): Promise<void> {
		return SetRemoveAllPairingHostI(codec, {
				pin: pin
		});
	}

	export function GetRemoveAllPairingResult(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HandleCommunicationLink.GetRemoveAllPairingResult()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetRemoveAllPairingResultI(codec : any, args : tInSetRemoveAllPairingResult): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.SetRemoveAllPairingResult(result: ' + __args.result+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetRemoveAllPairingResult(codec : any, result: Number): Promise<Number> {
		return SetRemoveAllPairingResultI(codec, {
				result: result
		});
	}

	export function GetTransferPairingResultI(codec : any, args : tInGetTransferPairingResult): Promise<void> {
		let __args = args;

		try {
			return codec.send('HandleCommunicationLink.GetTransferPairingResult(result: ' + __args.result+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetTransferPairingResult(codec : any, result: Number): Promise<void> {
		return GetTransferPairingResultI(codec, {
				result: result
		});
	}
}

export namespace HandleLogData {
	/**
	 *  Input interface for HandleLogData.GetLogData
	 */
	export interface tInGetLogData {
		startpos: Number
		length: Number
	}
	/**
	 *  Output interface for HandleLogData.GetParameterIntervalRec
	 */
	export interface tOutGetParameterIntervalRec {
		parametergroup: Uint8Array
		parameterid: Uint8Array
	}
	/**
	 *  Output interface for HandleLogData.SetParameterIntervalRec
	 */
	export interface tOutSetParameterIntervalRec {
		parametergroup: Uint8Array
		parameterid: Uint8Array
	}
	/**
	 *  Input interface for HandleLogData.SetParameterIntervalRec
	 */
	export interface tInSetParameterIntervalRec {
		parametergroup: Uint8Array
		parameterid: Uint8Array
	}
	/**
	 *  Input interface for HandleLogData.SetRealtimeDataInterval
	 */
	export interface tInSetRealtimeDataInterval {
		data: Uint8Array
	}
	/**
	 *  Output interface for HandleLogData.GetRecordingStatus
	 */
	export interface tOutGetRecordingStatus {
		recordingonoff: Number
		logbuffersize: Number
		noofparameter: Number
		noofrealtimedata: Number
		nooftrigrecords: Number
		totalbuffersize: Number
	}
	/**
	 *  Output interface for HandleLogData.GetTrigParameterList
	 */
	export interface tOutGetTrigParameterList {
		group1: Number
		id1: Number
		expression1: Number
		triglvl1: Number
		group2: Number
		id2: Number
		expression2: Number
		triglvl2: Number
	}
	/**
	 *  Output interface for HandleLogData.SetTrigParameterList
	 */
	export interface tOutSetTrigParameterList {
		group1: Number
		id1: Number
		expression1: Number
		triglvl1: Number
		group2: Number
		id2: Number
		expression2: Number
		triglvl2: Number
	}
	/**
	 *  Input interface for HandleLogData.SetTrigParameterList
	 */
	export interface tInSetTrigParameterList {
		group1: Number
		id1: Number
		expression1: Number
		triglvl1: Number
		group2: Number
		id2: Number
		expression2: Number
		triglvl2: Number
	}

	export function SetConnectToLog(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HandleLogData.SetConnectToLog()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetDisconnectToLog(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HandleLogData.SetDisconnectToLog()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetLogDataI(codec : any, args : tInGetLogData): Promise<String> {
		let __args = args;

		try {
			return codec.send('HandleLogData.GetLogData(startpos: ' + __args.startpos+ ',length: ' + __args.length+ ')');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function GetLogData(codec : any, startpos: Number, length: Number): Promise<String> {
		return GetLogDataI(codec, {
				startpos: startpos,
				length: length
		});
	}

	export function ResetLogData(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('HandleLogData.ResetLogData()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function GetParameterIntervalRec(codec : any): Promise<tOutGetParameterIntervalRec> {
		let __args = {};

		try {
			return codec.send('HandleLogData.GetParameterIntervalRec()');
		} catch(error) {
			return new Promise<tOutGetParameterIntervalRec>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterIntervalRecI(codec : any, args : tInSetParameterIntervalRec): Promise<tOutSetParameterIntervalRec> {
		let __args = args;

		try {
			return codec.send('HandleLogData.SetParameterIntervalRec(parametergroup: ' + __args.parametergroup+ ',parameterid: ' + __args.parameterid+ ')');
		} catch(error) {
			return new Promise<tOutSetParameterIntervalRec>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterIntervalRec(codec : any, parametergroup: Uint8Array, parameterid: Uint8Array): Promise<tOutSetParameterIntervalRec> {
		return SetParameterIntervalRecI(codec, {
				parametergroup: parametergroup,
				parameterid: parameterid
		});
	}

	export function GetRealtimeDataInterval(codec : any): Promise<Uint8Array> {
		let __args = {};

		try {
			return codec.send('HandleLogData.GetRealtimeDataInterval()');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function SetRealtimeDataIntervalI(codec : any, args : tInSetRealtimeDataInterval): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('HandleLogData.SetRealtimeDataInterval(data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function SetRealtimeDataInterval(codec : any, data: Uint8Array): Promise<Uint8Array> {
		return SetRealtimeDataIntervalI(codec, {
				data: data
		});
	}

	export function GetRecordingStatus(codec : any): Promise<tOutGetRecordingStatus> {
		let __args = {};

		try {
			return codec.send('HandleLogData.GetRecordingStatus()');
		} catch(error) {
			return new Promise<tOutGetRecordingStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetTrigParameterList(codec : any): Promise<tOutGetTrigParameterList> {
		let __args = {};

		try {
			return codec.send('HandleLogData.GetTrigParameterList()');
		} catch(error) {
			return new Promise<tOutGetTrigParameterList>((res,reject) => { reject(error);});
		}
	}

	export function SetTrigParameterListI(codec : any, args : tInSetTrigParameterList): Promise<tOutSetTrigParameterList> {
		let __args = args;

		try {
			return codec.send('HandleLogData.SetTrigParameterList(group1: ' + __args.group1+ ',id1: ' + __args.id1+ ',expression1: ' + __args.expression1+ ',triglvl1: ' + __args.triglvl1+ ',group2: ' + __args.group2+ ',id2: ' + __args.id2+ ',expression2: ' + __args.expression2+ ',triglvl2: ' + __args.triglvl2+ ')');
		} catch(error) {
			return new Promise<tOutSetTrigParameterList>((res,reject) => { reject(error);});
		}
	}

	export function SetTrigParameterList(codec : any, group1: Number, id1: Number, expression1: Number, triglvl1: Number, group2: Number, id2: Number, expression2: Number, triglvl2: Number): Promise<tOutSetTrigParameterList> {
		return SetTrigParameterListI(codec, {
				group1: group1,
				id1: id1,
				expression1: expression1,
				triglvl1: triglvl1,
				group2: group2,
				id2: id2,
				expression2: expression2,
				triglvl2: triglvl2
		});
	}
}

export namespace Memory {
	/**
	 *  Input interface for Memory.GetMemory
	 */
	export interface tInGetMemory {
		targetcommand: Number
		memorypartition: Number
		memoryaddress: Number
		data: Number
		nrofbytes: Number
	}
	/**
	 *  Input interface for Memory.SetMemory
	 */
	export interface tInSetMemory {
		targetcommand: Number
		memorypartition: Number
		memoryaddress: Number
		data: Number
		nrofbytes: Number
	}

	export function GetMemoryI(codec : any, args : tInGetMemory): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Memory.GetMemory(targetcommand: ' + __args.targetcommand+ ',memorypartition: ' + __args.memorypartition+ ',memoryaddress: ' + __args.memoryaddress+ ',data: ' + __args.data+ ',nrofbytes: ' + __args.nrofbytes+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetMemory(codec : any, targetcommand: Number, memorypartition: Number, memoryaddress: Number, data: Number, nrofbytes: Number): Promise<Number> {
		return GetMemoryI(codec, {
				targetcommand: targetcommand,
				memorypartition: memorypartition,
				memoryaddress: memoryaddress,
				data: data,
				nrofbytes: nrofbytes
		});
	}

	export function SetMemoryI(codec : any, args : tInSetMemory): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Memory.SetMemory(targetcommand: ' + __args.targetcommand+ ',memorypartition: ' + __args.memorypartition+ ',memoryaddress: ' + __args.memoryaddress+ ',data: ' + __args.data+ ',nrofbytes: ' + __args.nrofbytes+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetMemory(codec : any, targetcommand: Number, memorypartition: Number, memoryaddress: Number, data: Number, nrofbytes: Number): Promise<Number> {
		return SetMemoryI(codec, {
				targetcommand: targetcommand,
				memorypartition: memorypartition,
				memoryaddress: memoryaddress,
				data: data,
				nrofbytes: nrofbytes
		});
	}
}

export namespace RealTimeData {
	/**
	 *  Output interface for RealTimeData.GetWirelessLinkStatus
	 */
	export interface tOutGetWirelessLinkStatus {
		connectionstatus: Number
		signalquality: Number
	}
	/**
	 *  Output interface for RealTimeData.GetBatteryData
	 */
	export interface tOutGetBatteryData {
		batavoltage: Number
		bataenergylevel: Number
		batacurrent: Number
		batatemp: Number
		batacapacity: Number
		batbvoltage: Number
		batbenergylevel: Number
		batbcurrent: Number
		batbtemp: Number
		batbcapacity: Number
	}
	/**
	 *  Output interface for RealTimeData.GetBladeMotorData
	 */
	export interface tOutGetBladeMotorData {
		speed: Number
		current: Number
		averagecurrent: Number
	}
	/**
	 *  Output interface for RealTimeData.GetChargingStationLEDStatus
	 */
	export interface tOutGetChargingStationLEDStatus {
		colour: Number
		mode: Number
	}
	/**
	 *  Output interface for RealTimeData.GetChargingStationLoopCurrents
	 */
	export interface tOutGetChargingStationLoopCurrents {
		highimpedance: Number
		loopacurrent: Number
		looparevcurrent: Number
		loopfcurrent: Number
		loopncurrent: Number
		loopg1current: Number
		loopg2current: Number
		loopg3current: Number
	}
	/**
	 *  Output interface for RealTimeData.GetChargingStationPeriodTime
	 */
	export interface tOutGetChargingStationPeriodTime {
		periodtime: Number
		activatedpulses: Number
	}
	/**
	 *  Output interface for RealTimeData.GetChargingStationPowerData
	 */
	export interface tOutGetChargingStationPowerData {
		inputvoltage: Number
		mowercurrent: Number
	}
	/**
	 *  Output interface for RealTimeData.GetComboardSensorData
	 */
	export interface tOutGetComboardSensorData {
		pitch: Number
		roll: Number
		zacceleration: Number
		upsidedown: Number
		mowertemp: Number
	}
	/**
	 *  Output interface for RealTimeData.GetFrontCenterLoopSensorData
	 */
	export interface tOutGetFrontCenterLoopSensorData {
		signalquality: Number
		a0signal: Number
		fsignal: Number
		guide1signal: Number
		guide2signal: Number
		messagefromcs: Number
		incharginstation: Number
		nsignal: Number
		guide3signal: Number
	}
	/**
	 *  Output interface for RealTimeData.GetFrontRightLoopSensorData
	 */
	export interface tOutGetFrontRightLoopSensorData {
		signalquality: Number
		a0signal: Number
		fsignal: Number
		guide1signal: Number
		guide2signal: Number
		messagefromcs: Number
		incharginstation: Number
		nsignal: Number
		guide3signal: Number
	}
	/**
	 *  Output interface for RealTimeData.GetGPSData
	 */
	export interface tOutGetGPSData {
		quality: Number
		noofsatellites: Number
		hdop: Number
		northsouth: Number
		eastwest: Number
		latitudedegreeminute: Number
		latitudedecimalminute: Number
		longitudedegreeminute: Number
		longitudedecimalminute: Number
		xpos: Number
		ypos: Number
		gpstype: Number
		gpscoverage: Number
		gpsnavigationstatus: Number
		gpsstatus: Number
	}
	/**
	 *  Output interface for RealTimeData.GetLoopFilterData
	 */
	export interface tOutGetLoopFilterData {
		signallocked: Number
		signallevel: Number
		noicelevel: Number
		filterdelay: Number
	}
	/**
	 *  Output interface for RealTimeData.GetRearLeftLoopSensorData
	 */
	export interface tOutGetRearLeftLoopSensorData {
		signalquality: Number
		a0signal: Number
		fsignal: Number
		guide1signal: Number
		guide2signal: Number
		messagefromcs: Number
		incharginstation: Number
		nsignal: Number
		guide3signal: Number
	}
	/**
	 *  Output interface for RealTimeData.GetRearRightLoopSensorData
	 */
	export interface tOutGetRearRightLoopSensorData {
		signalquality: Number
		a0signal: Number
		fsignal: Number
		guide1signal: Number
		guide2signal: Number
		messagefromcs: Number
		incharginstation: Number
		nsignal: Number
		guide3signal: Number
	}
	/**
	 *  Output interface for RealTimeData.GetSensorData
	 */
	export interface tOutGetSensorData {
		collision: Number
		lift: Number
		pitch: Number
		roll: Number
		zacceleration: Number
		upsidedown: Number
		mowertemp: Number
	}
	/**
	 *  Output interface for RealTimeData.GetSumLoopSensorData
	 */
	export interface tOutGetSumLoopSensorData {
		signalquality: Number
		a0signal: Number
		fsignal: Number
		guide1signal: Number
		guide2signal: Number
		messagefromcs: Number
		incharginstation: Number
		nsignal: Number
		guide3signal: Number
	}
	/**
	 *  Output interface for RealTimeData.GetUltrasonicTrackingData
	 */
	export interface tOutGetUltrasonicTrackingData {
		id1: Number
		id2: Number
		id3: Number
		id4: Number
		id5: Number
		distance1: Number
		distance2: Number
		distance3: Number
		distance4: Number
		distance5: Number
		signalstr1: Number
		signalstr2: Number
		signalstr3: Number
		signalstr4: Number
		signalstr5: Number
	}
	/**
	 *  Output interface for RealTimeData.GetUltrasonicStatus
	 */
	export interface tOutGetUltrasonicStatus {
		status: Number
		errorcode: Number
		noofobjects: Number
		distance: Number
	}
	/**
	 *  Output interface for RealTimeData.GetUserinterfaceData
	 */
	export interface tOutGetUserinterfaceData {
		keyboard: Number
		mainswitch: Number
		stopbutton: Number
	}
	/**
	 *  Output interface for RealTimeData.GetWheelMotorData
	 */
	export interface tOutGetWheelMotorData {
		powerleft: Number
		speedleft: Number
		currentleft: Number
		powerright: Number
		speedright: Number
		currentright: Number
		difference: Number
	}

	export function GetWirelessLinkStatus(codec : any): Promise<tOutGetWirelessLinkStatus> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetWirelessLinkStatus()');
		} catch(error) {
			return new Promise<tOutGetWirelessLinkStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetBatteryData(codec : any): Promise<tOutGetBatteryData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetBatteryData()');
		} catch(error) {
			return new Promise<tOutGetBatteryData>((res,reject) => { reject(error);});
		}
	}

	export function GetBladeMotorData(codec : any): Promise<tOutGetBladeMotorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetBladeMotorData()');
		} catch(error) {
			return new Promise<tOutGetBladeMotorData>((res,reject) => { reject(error);});
		}
	}

	export function GetChargingStationLEDStatus(codec : any): Promise<tOutGetChargingStationLEDStatus> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetChargingStationLEDStatus()');
		} catch(error) {
			return new Promise<tOutGetChargingStationLEDStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetChargingStationLoopCurrents(codec : any): Promise<tOutGetChargingStationLoopCurrents> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetChargingStationLoopCurrents()');
		} catch(error) {
			return new Promise<tOutGetChargingStationLoopCurrents>((res,reject) => { reject(error);});
		}
	}

	export function GetChargingStationPeriodTime(codec : any): Promise<tOutGetChargingStationPeriodTime> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetChargingStationPeriodTime()');
		} catch(error) {
			return new Promise<tOutGetChargingStationPeriodTime>((res,reject) => { reject(error);});
		}
	}

	export function GetChargingStationPowerData(codec : any): Promise<tOutGetChargingStationPowerData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetChargingStationPowerData()');
		} catch(error) {
			return new Promise<tOutGetChargingStationPowerData>((res,reject) => { reject(error);});
		}
	}

	export function GetComboardSensorData(codec : any): Promise<tOutGetComboardSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetComboardSensorData()');
		} catch(error) {
			return new Promise<tOutGetComboardSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetFrontCenterLoopSensorData(codec : any): Promise<tOutGetFrontCenterLoopSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetFrontCenterLoopSensorData()');
		} catch(error) {
			return new Promise<tOutGetFrontCenterLoopSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetFrontRightLoopSensorData(codec : any): Promise<tOutGetFrontRightLoopSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetFrontRightLoopSensorData()');
		} catch(error) {
			return new Promise<tOutGetFrontRightLoopSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetGPSData(codec : any): Promise<tOutGetGPSData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetGPSData()');
		} catch(error) {
			return new Promise<tOutGetGPSData>((res,reject) => { reject(error);});
		}
	}

	export function GetLoopFilterData(codec : any): Promise<tOutGetLoopFilterData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetLoopFilterData()');
		} catch(error) {
			return new Promise<tOutGetLoopFilterData>((res,reject) => { reject(error);});
		}
	}

	export function GetNavigatorData(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetNavigatorData()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetRearLeftLoopSensorData(codec : any): Promise<tOutGetRearLeftLoopSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetRearLeftLoopSensorData()');
		} catch(error) {
			return new Promise<tOutGetRearLeftLoopSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetRearRightLoopSensorData(codec : any): Promise<tOutGetRearRightLoopSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetRearRightLoopSensorData()');
		} catch(error) {
			return new Promise<tOutGetRearRightLoopSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetSensorData(codec : any): Promise<tOutGetSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetSensorData()');
		} catch(error) {
			return new Promise<tOutGetSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetSumLoopSensorData(codec : any): Promise<tOutGetSumLoopSensorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetSumLoopSensorData()');
		} catch(error) {
			return new Promise<tOutGetSumLoopSensorData>((res,reject) => { reject(error);});
		}
	}

	export function GetUltrasonicTrackingData(codec : any): Promise<tOutGetUltrasonicTrackingData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetUltrasonicTrackingData()');
		} catch(error) {
			return new Promise<tOutGetUltrasonicTrackingData>((res,reject) => { reject(error);});
		}
	}

	export function GetUltrasonicStatus(codec : any): Promise<tOutGetUltrasonicStatus> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetUltrasonicStatus()');
		} catch(error) {
			return new Promise<tOutGetUltrasonicStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetUserinterfaceData(codec : any): Promise<tOutGetUserinterfaceData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetUserinterfaceData()');
		} catch(error) {
			return new Promise<tOutGetUserinterfaceData>((res,reject) => { reject(error);});
		}
	}

	export function GetWheelMotorData(codec : any): Promise<tOutGetWheelMotorData> {
		let __args = {};

		try {
			return codec.send('RealTimeData.GetWheelMotorData()');
		} catch(error) {
			return new Promise<tOutGetWheelMotorData>((res,reject) => { reject(error);});
		}
	}
}

export namespace NMEAData {
	/**
	 *  Input interface for NMEAData.SetGPSToMain
	 */
	export interface tInSetGPSToMain {
		nmeadata: String
	}
	/**
	 *  Input interface for NMEAData.SetMainToGPS
	 */
	export interface tInSetMainToGPS {
		nmeadata: String
	}

	export function SetGPSToMainI(codec : any, args : tInSetGPSToMain): Promise<String> {
		let __args = args;

		try {
			return codec.send('NMEAData.SetGPSToMain(nmeadata: ' + __args.nmeadata+ ')');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetGPSToMain(codec : any, nmeadata: String): Promise<String> {
		return SetGPSToMainI(codec, {
				nmeadata: nmeadata
		});
	}

	export function SetMainToGPSI(codec : any, args : tInSetMainToGPS): Promise<String> {
		let __args = args;

		try {
			return codec.send('NMEAData.SetMainToGPS(nmeadata: ' + __args.nmeadata+ ')');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetMainToGPS(codec : any, nmeadata: String): Promise<String> {
		return SetMainToGPSI(codec, {
				nmeadata: nmeadata
		});
	}
}

export namespace OperatingData {
	/**
	 *  Output interface for OperatingData.GetHistogramOverBatteryComplete
	 */
	export interface tOutGetHistogramOverBatteryComplete {
		temp0: Number
		temp1: Number
		temp2: Number
		temp3: Number
		temp4: Number
		temp5: Number
		temp6: Number
		temp7: Number
		temp8: Number
		temp9: Number
		temp10: Number
		temp11: Number
		temp12: Number
		mintemp: Number
		maxtemp: Number
	}
	/**
	 *  Input interface for OperatingData.GetHistogramOverBatteryComplete
	 */
	export interface tInGetHistogramOverBatteryComplete {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetHistogramOverBatteryComplete
	 */
	export interface tOutResetGetHistogramOverBatteryComplete {
		temp0: Number
		temp1: Number
		temp2: Number
		temp3: Number
		temp4: Number
		temp5: Number
		temp6: Number
		temp7: Number
		temp8: Number
		temp9: Number
		temp10: Number
		temp11: Number
		temp12: Number
		mintemp: Number
		maxtemp: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetHistogramOverBatteryComplete
	 */
	export interface tInResetGetHistogramOverBatteryComplete {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetHistogramOverBatteryDocking
	 */
	export interface tOutGetHistogramOverBatteryDocking {
		temp0: Number
		temp1: Number
		temp2: Number
		temp3: Number
		temp4: Number
		temp5: Number
		temp6: Number
		temp7: Number
		temp8: Number
		temp9: Number
		temp10: Number
		temp11: Number
		temp12: Number
		mintemp: Number
		maxtemp: Number
	}
	/**
	 *  Input interface for OperatingData.GetHistogramOverBatteryDocking
	 */
	export interface tInGetHistogramOverBatteryDocking {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetHistogramOverBatteryDocking
	 */
	export interface tOutResetGetHistogramOverBatteryDocking {
		temp0: Number
		temp1: Number
		temp2: Number
		temp3: Number
		temp4: Number
		temp5: Number
		temp6: Number
		temp7: Number
		temp8: Number
		temp9: Number
		temp10: Number
		temp11: Number
		temp12: Number
		mintemp: Number
		maxtemp: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetHistogramOverBatteryDocking
	 */
	export interface tInResetGetHistogramOverBatteryDocking {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetHistogramOverLoopSignal
	 */
	export interface tOutGetHistogramOverLoopSignal {
		loopsignal0: Number
		loopsignal1: Number
		loopsignal2: Number
		loopsignal3: Number
		loopsignal4: Number
		loopsignal5: Number
		loopsignal6: Number
		loopsignal7: Number
		loopsignaloffset: Number
	}
	/**
	 *  Input interface for OperatingData.GetHistogramOverLoopSignal
	 */
	export interface tInGetHistogramOverLoopSignal {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetHistogramOverLoopSignal
	 */
	export interface tOutResetGetHistogramOverLoopSignal {
		loopsignal0: Number
		loopsignal1: Number
		loopsignal2: Number
		loopsignal3: Number
		loopsignal4: Number
		loopsignal5: Number
		loopsignal6: Number
		loopsignal7: Number
		loopsignaloffset: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetHistogramOverLoopSignal
	 */
	export interface tInResetGetHistogramOverLoopSignal {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetHistogramOverTilt
	 */
	export interface tOutGetHistogramOverTilt {
		tiltangle0: Number
		tiltangle1: Number
		tiltangle2: Number
		tiltangle3: Number
		tiltangle4: Number
		tiltangle5: Number
		tiltangle6: Number
		tiltangle7: Number
	}
	/**
	 *  Input interface for OperatingData.GetHistogramOverTilt
	 */
	export interface tInGetHistogramOverTilt {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetHistogramOverTilt
	 */
	export interface tOutResetGetHistogramOverTilt {
		tiltangle0: Number
		tiltangle1: Number
		tiltangle2: Number
		tiltangle3: Number
		tiltangle4: Number
		tiltangle5: Number
		tiltangle6: Number
		tiltangle7: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetHistogramOverTilt
	 */
	export interface tInResetGetHistogramOverTilt {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.GetMessageCounter
	 */
	export interface tInGetMessageCounter {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetMessageCounter
	 */
	export interface tInResetGetMessageCounter {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.Getonepostbatteryhistory
	 */
	export interface tOutGetonepostbatteryhistory {
		datetimemeasurement: Number
		chargingnumber: Number
		capacitybatterya: Number
		capacitybatteryb: Number
	}
	/**
	 *  Input interface for OperatingData.Getonepostbatteryhistory
	 */
	export interface tInGetonepostbatteryhistory {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetonepostbatteryhistory
	 */
	export interface tOutResetGetonepostbatteryhistory {
		datetimemeasurement: Number
		chargingnumber: Number
		capacitybatterya: Number
		capacitybatteryb: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetonepostbatteryhistory
	 */
	export interface tInResetGetonepostbatteryhistory {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.GetOnePostCuttingTime
	 */
	export interface tInGetOnePostCuttingTime {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetOnePostCuttingTime
	 */
	export interface tInResetGetOnePostCuttingTime {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetOnePostMowerInternal
	 */
	export interface tOutGetOnePostMowerInternal {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		pitchangle: Number
		rollangle: Number
		substate: Number
		mapxpos: Number
		mapypos: Number
		logdata: Number
		applicationbuildnr: Number
	}
	/**
	 *  Input interface for OperatingData.GetOnePostMowerInternal
	 */
	export interface tInGetOnePostMowerInternal {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetOnePostMowerInternal
	 */
	export interface tOutResetGetOnePostMowerInternal {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		pitchangle: Number
		rollangle: Number
		substate: Number
		mapxpos: Number
		mapypos: Number
		logdata: Number
		applicationbuildnr: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetOnePostMowerInternal
	 */
	export interface tInResetGetOnePostMowerInternal {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetOnePostMowerPublic
	 */
	export interface tOutGetOnePostMowerPublic {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		pitchangle: Number
		rollangle: Number
		substate: Number
		mapxpos: Number
		mapypos: Number
	}
	/**
	 *  Input interface for OperatingData.GetOnePostMowerPublic
	 */
	export interface tInGetOnePostMowerPublic {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetOnePostMowerPublic
	 */
	export interface tOutResetGetOnePostMowerPublic {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		pitchangle: Number
		rollangle: Number
		substate: Number
		mapxpos: Number
		mapypos: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetOnePostMowerPublic
	 */
	export interface tInResetGetOnePostMowerPublic {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetOnePostTrackerPublic
	 */
	export interface tOutGetOnePostTrackerPublic {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		rssi: Number
		trackerspare: Number
		substate: Number
		logdata: Number
	}
	/**
	 *  Input interface for OperatingData.GetOnePostTrackerPublic
	 */
	export interface tInGetOnePostTrackerPublic {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetOnePostTrackerPublic
	 */
	export interface tOutResetGetOnePostTrackerPublic {
		datetimeevent: Number
		messagecode: Number
		severity: Number
		rssi: Number
		trackerspare: Number
		substate: Number
		logdata: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetOnePostTrackerPublic
	 */
	export interface tInResetGetOnePostTrackerPublic {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.GetOnePostSearchTime
	 */
	export interface tInGetOnePostSearchTime {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetOnePostSearchTime
	 */
	export interface tInResetGetOnePostSearchTime {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetOperatingData
	 */
	export interface tOutGetOperatingData {
		totalrunningtime: Number
		totalcuttingtime: Number
		totalsearchingtime: Number
		totalchargingtime: Number
		completecharges: Number
		datetimeofmowerproduction: Number
		totalnumberoffatalerrors: Number
	}
	/**
	 *  Output interface for OperatingData.SetOperatingData
	 */
	export interface tOutSetOperatingData {
		totalrunningtime: Number
		totalcuttingtime: Number
		totalsearchingtime: Number
		totalchargingtime: Number
		completecharges: Number
		datetimeofmowerproduction: Number
		totalnumberoffatalerrors: Number
	}
	/**
	 *  Input interface for OperatingData.SetOperatingData
	 */
	export interface tInSetOperatingData {
		totalrunningtime: Number
		totalcuttingtime: Number
		totalsearchingtime: Number
		totalchargingtime: Number
		completecharges: Number
		datetimeofmowerproduction: Number
		totalnumberoffatalerrors: Number
	}
	/**
	 *  Output interface for OperatingData.GetTrackerStatisticCounters
	 */
	export interface tOutGetTrackerStatisticCounters {
		timestamp: Number
		wdreset: Number
		gprsreset: Number
		gsmreset: Number
		tcpretry: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetTrackerStatisticCounters
	 */
	export interface tOutResetGetTrackerStatisticCounters {
		timestamp: Number
		wdreset: Number
		gprsreset: Number
		gsmreset: Number
		tcpretry: Number
	}
	/**
	 *  Output interface for OperatingData.GetTripOperatingData
	 */
	export interface tOutGetTripOperatingData {
		totalrunningtime: Number
		totalcuttingtime: Number
		totalsearchingtime: Number
		totalchargingtime: Number
		completecharges: Number
		datetimeofmowerproduction: Number
		totalnumberoffatalerrors: Number
	}
	/**
	 *  Input interface for OperatingData.GetTripOperatingData
	 */
	export interface tInGetTripOperatingData {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetTripOperatingData
	 */
	export interface tOutResetGetTripOperatingData {
		totalrunningtime: Number
		totalcuttingtime: Number
		totalsearchingtime: Number
		totalchargingtime: Number
		completecharges: Number
		datetimeofmowerproduction: Number
		totalnumberoffatalerrors: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetTripOperatingData
	 */
	export interface tInResetGetTripOperatingData {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.ResetAllHistogram
	 */
	export interface tInResetAllHistogram {
		index: Number
	}
	/**
	 *  Input interface for OperatingData.ResetChargingCounter
	 */
	export interface tInResetChargingCounter {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.GetHistogramOverTypeResistor
	 */
	export interface tOutGetHistogramOverTypeResistor {
		range1: Number
		range2: Number
		range3: Number
		range4: Number
		range5: Number
	}
	/**
	 *  Input interface for OperatingData.GetHistogramOverTypeResistor
	 */
	export interface tInGetHistogramOverTypeResistor {
		index: Number
	}
	/**
	 *  Output interface for OperatingData.ResetGetHistogramOverTypeResistor
	 */
	export interface tOutResetGetHistogramOverTypeResistor {
		range1: Number
		range2: Number
		range3: Number
		range4: Number
		range5: Number
	}
	/**
	 *  Input interface for OperatingData.ResetGetHistogramOverTypeResistor
	 */
	export interface tInResetGetHistogramOverTypeResistor {
		index: Number
	}

	export function GetHistogramOverBatteryCompleteI(codec : any, args : tInGetHistogramOverBatteryComplete): Promise<tOutGetHistogramOverBatteryComplete> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetHistogramOverBatteryComplete(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetHistogramOverBatteryComplete>((res,reject) => { reject(error);});
		}
	}

	export function GetHistogramOverBatteryComplete(codec : any, index: Number): Promise<tOutGetHistogramOverBatteryComplete> {
		return GetHistogramOverBatteryCompleteI(codec, {
				index: index
		});
	}

	export function ResetGetHistogramOverBatteryCompleteI(codec : any, args : tInResetGetHistogramOverBatteryComplete): Promise<tOutResetGetHistogramOverBatteryComplete> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetHistogramOverBatteryComplete(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetHistogramOverBatteryComplete>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetHistogramOverBatteryComplete(codec : any, index: Number): Promise<tOutResetGetHistogramOverBatteryComplete> {
		return ResetGetHistogramOverBatteryCompleteI(codec, {
				index: index
		});
	}

	export function GetHistogramOverBatteryDockingI(codec : any, args : tInGetHistogramOverBatteryDocking): Promise<tOutGetHistogramOverBatteryDocking> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetHistogramOverBatteryDocking(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetHistogramOverBatteryDocking>((res,reject) => { reject(error);});
		}
	}

	export function GetHistogramOverBatteryDocking(codec : any, index: Number): Promise<tOutGetHistogramOverBatteryDocking> {
		return GetHistogramOverBatteryDockingI(codec, {
				index: index
		});
	}

	export function ResetGetHistogramOverBatteryDockingI(codec : any, args : tInResetGetHistogramOverBatteryDocking): Promise<tOutResetGetHistogramOverBatteryDocking> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetHistogramOverBatteryDocking(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetHistogramOverBatteryDocking>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetHistogramOverBatteryDocking(codec : any, index: Number): Promise<tOutResetGetHistogramOverBatteryDocking> {
		return ResetGetHistogramOverBatteryDockingI(codec, {
				index: index
		});
	}

	export function GetHistogramOverLoopSignalI(codec : any, args : tInGetHistogramOverLoopSignal): Promise<tOutGetHistogramOverLoopSignal> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetHistogramOverLoopSignal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetHistogramOverLoopSignal>((res,reject) => { reject(error);});
		}
	}

	export function GetHistogramOverLoopSignal(codec : any, index: Number): Promise<tOutGetHistogramOverLoopSignal> {
		return GetHistogramOverLoopSignalI(codec, {
				index: index
		});
	}

	export function ResetGetHistogramOverLoopSignalI(codec : any, args : tInResetGetHistogramOverLoopSignal): Promise<tOutResetGetHistogramOverLoopSignal> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetHistogramOverLoopSignal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetHistogramOverLoopSignal>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetHistogramOverLoopSignal(codec : any, index: Number): Promise<tOutResetGetHistogramOverLoopSignal> {
		return ResetGetHistogramOverLoopSignalI(codec, {
				index: index
		});
	}

	export function GetHistogramOverTiltI(codec : any, args : tInGetHistogramOverTilt): Promise<tOutGetHistogramOverTilt> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetHistogramOverTilt(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetHistogramOverTilt>((res,reject) => { reject(error);});
		}
	}

	export function GetHistogramOverTilt(codec : any, index: Number): Promise<tOutGetHistogramOverTilt> {
		return GetHistogramOverTiltI(codec, {
				index: index
		});
	}

	export function ResetGetHistogramOverTiltI(codec : any, args : tInResetGetHistogramOverTilt): Promise<tOutResetGetHistogramOverTilt> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetHistogramOverTilt(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetHistogramOverTilt>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetHistogramOverTilt(codec : any, index: Number): Promise<tOutResetGetHistogramOverTilt> {
		return ResetGetHistogramOverTiltI(codec, {
				index: index
		});
	}

	export function GetMessageCounterI(codec : any, args : tInGetMessageCounter): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetMessageCounter(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function GetMessageCounter(codec : any, index: Number): Promise<Uint8Array> {
		return GetMessageCounterI(codec, {
				index: index
		});
	}

	export function ResetGetMessageCounterI(codec : any, args : tInResetGetMessageCounter): Promise<Uint8Array> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetMessageCounter(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Uint8Array>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetMessageCounter(codec : any, index: Number): Promise<Uint8Array> {
		return ResetGetMessageCounterI(codec, {
				index: index
		});
	}

	export function GetonepostbatteryhistoryI(codec : any, args : tInGetonepostbatteryhistory): Promise<tOutGetonepostbatteryhistory> {
		let __args = args;

		try {
			return codec.send('OperatingData.Getonepostbatteryhistory(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetonepostbatteryhistory>((res,reject) => { reject(error);});
		}
	}

	export function Getonepostbatteryhistory(codec : any, index: Number): Promise<tOutGetonepostbatteryhistory> {
		return GetonepostbatteryhistoryI(codec, {
				index: index
		});
	}

	export function ResetGetonepostbatteryhistoryI(codec : any, args : tInResetGetonepostbatteryhistory): Promise<tOutResetGetonepostbatteryhistory> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetonepostbatteryhistory(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetonepostbatteryhistory>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetonepostbatteryhistory(codec : any, index: Number): Promise<tOutResetGetonepostbatteryhistory> {
		return ResetGetonepostbatteryhistoryI(codec, {
				index: index
		});
	}

	export function GetOnePostCuttingTimeI(codec : any, args : tInGetOnePostCuttingTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetOnePostCuttingTime(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetOnePostCuttingTime(codec : any, index: Number): Promise<Number> {
		return GetOnePostCuttingTimeI(codec, {
				index: index
		});
	}

	export function ResetGetOnePostCuttingTimeI(codec : any, args : tInResetGetOnePostCuttingTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetOnePostCuttingTime(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetOnePostCuttingTime(codec : any, index: Number): Promise<Number> {
		return ResetGetOnePostCuttingTimeI(codec, {
				index: index
		});
	}

	export function GetOnePostMowerInternalI(codec : any, args : tInGetOnePostMowerInternal): Promise<tOutGetOnePostMowerInternal> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetOnePostMowerInternal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetOnePostMowerInternal>((res,reject) => { reject(error);});
		}
	}

	export function GetOnePostMowerInternal(codec : any, index: Number): Promise<tOutGetOnePostMowerInternal> {
		return GetOnePostMowerInternalI(codec, {
				index: index
		});
	}

	export function ResetGetOnePostMowerInternalI(codec : any, args : tInResetGetOnePostMowerInternal): Promise<tOutResetGetOnePostMowerInternal> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetOnePostMowerInternal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetOnePostMowerInternal>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetOnePostMowerInternal(codec : any, index: Number): Promise<tOutResetGetOnePostMowerInternal> {
		return ResetGetOnePostMowerInternalI(codec, {
				index: index
		});
	}

	export function GetOnePostMowerPublicI(codec : any, args : tInGetOnePostMowerPublic): Promise<tOutGetOnePostMowerPublic> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetOnePostMowerPublic(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetOnePostMowerPublic>((res,reject) => { reject(error);});
		}
	}

	export function GetOnePostMowerPublic(codec : any, index: Number): Promise<tOutGetOnePostMowerPublic> {
		return GetOnePostMowerPublicI(codec, {
				index: index
		});
	}

	export function ResetGetOnePostMowerPublicI(codec : any, args : tInResetGetOnePostMowerPublic): Promise<tOutResetGetOnePostMowerPublic> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetOnePostMowerPublic(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetOnePostMowerPublic>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetOnePostMowerPublic(codec : any, index: Number): Promise<tOutResetGetOnePostMowerPublic> {
		return ResetGetOnePostMowerPublicI(codec, {
				index: index
		});
	}

	export function GetOnePostTrackerPublicI(codec : any, args : tInGetOnePostTrackerPublic): Promise<tOutGetOnePostTrackerPublic> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetOnePostTrackerPublic(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetOnePostTrackerPublic>((res,reject) => { reject(error);});
		}
	}

	export function GetOnePostTrackerPublic(codec : any, index: Number): Promise<tOutGetOnePostTrackerPublic> {
		return GetOnePostTrackerPublicI(codec, {
				index: index
		});
	}

	export function ResetGetOnePostTrackerPublicI(codec : any, args : tInResetGetOnePostTrackerPublic): Promise<tOutResetGetOnePostTrackerPublic> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetOnePostTrackerPublic(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetOnePostTrackerPublic>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetOnePostTrackerPublic(codec : any, index: Number): Promise<tOutResetGetOnePostTrackerPublic> {
		return ResetGetOnePostTrackerPublicI(codec, {
				index: index
		});
	}

	export function GetOnePostSearchTimeI(codec : any, args : tInGetOnePostSearchTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetOnePostSearchTime(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetOnePostSearchTime(codec : any, index: Number): Promise<Number> {
		return GetOnePostSearchTimeI(codec, {
				index: index
		});
	}

	export function ResetGetOnePostSearchTimeI(codec : any, args : tInResetGetOnePostSearchTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetOnePostSearchTime(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetOnePostSearchTime(codec : any, index: Number): Promise<Number> {
		return ResetGetOnePostSearchTimeI(codec, {
				index: index
		});
	}

	export function GetOperatingData(codec : any): Promise<tOutGetOperatingData> {
		let __args = {};

		try {
			return codec.send('OperatingData.GetOperatingData()');
		} catch(error) {
			return new Promise<tOutGetOperatingData>((res,reject) => { reject(error);});
		}
	}

	export function SetOperatingDataI(codec : any, args : tInSetOperatingData): Promise<tOutSetOperatingData> {
		let __args = args;

		try {
			return codec.send('OperatingData.SetOperatingData(totalrunningtime: ' + __args.totalrunningtime+ ',totalcuttingtime: ' + __args.totalcuttingtime+ ',totalsearchingtime: ' + __args.totalsearchingtime+ ',totalchargingtime: ' + __args.totalchargingtime+ ',completecharges: ' + __args.completecharges+ ',datetimeofmowerproduction: ' + __args.datetimeofmowerproduction+ ',totalnumberoffatalerrors: ' + __args.totalnumberoffatalerrors+ ')');
		} catch(error) {
			return new Promise<tOutSetOperatingData>((res,reject) => { reject(error);});
		}
	}

	export function SetOperatingData(codec : any, totalrunningtime: Number, totalcuttingtime: Number, totalsearchingtime: Number, totalchargingtime: Number, completecharges: Number, datetimeofmowerproduction: Number, totalnumberoffatalerrors: Number): Promise<tOutSetOperatingData> {
		return SetOperatingDataI(codec, {
				totalrunningtime: totalrunningtime,
				totalcuttingtime: totalcuttingtime,
				totalsearchingtime: totalsearchingtime,
				totalchargingtime: totalchargingtime,
				completecharges: completecharges,
				datetimeofmowerproduction: datetimeofmowerproduction,
				totalnumberoffatalerrors: totalnumberoffatalerrors
		});
	}

	export function GetTrackerStatisticCounters(codec : any): Promise<tOutGetTrackerStatisticCounters> {
		let __args = {};

		try {
			return codec.send('OperatingData.GetTrackerStatisticCounters()');
		} catch(error) {
			return new Promise<tOutGetTrackerStatisticCounters>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetTrackerStatisticCounters(codec : any): Promise<tOutResetGetTrackerStatisticCounters> {
		let __args = {};

		try {
			return codec.send('OperatingData.ResetGetTrackerStatisticCounters()');
		} catch(error) {
			return new Promise<tOutResetGetTrackerStatisticCounters>((res,reject) => { reject(error);});
		}
	}

	export function GetTripOperatingDataI(codec : any, args : tInGetTripOperatingData): Promise<tOutGetTripOperatingData> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetTripOperatingData(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetTripOperatingData>((res,reject) => { reject(error);});
		}
	}

	export function GetTripOperatingData(codec : any, index: Number): Promise<tOutGetTripOperatingData> {
		return GetTripOperatingDataI(codec, {
				index: index
		});
	}

	export function ResetGetTripOperatingDataI(codec : any, args : tInResetGetTripOperatingData): Promise<tOutResetGetTripOperatingData> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetTripOperatingData(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetTripOperatingData>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetTripOperatingData(codec : any, index: Number): Promise<tOutResetGetTripOperatingData> {
		return ResetGetTripOperatingDataI(codec, {
				index: index
		});
	}

	export function ResetAllHistogramI(codec : any, args : tInResetAllHistogram): Promise<void> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetAllHistogram(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ResetAllHistogram(codec : any, index: Number): Promise<void> {
		return ResetAllHistogramI(codec, {
				index: index
		});
	}

	export function ResetChargingCounterI(codec : any, args : tInResetChargingCounter): Promise<void> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetChargingCounter(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ResetChargingCounter(codec : any, index: Number): Promise<void> {
		return ResetChargingCounterI(codec, {
				index: index
		});
	}

	export function GetHistogramOverTypeResistorI(codec : any, args : tInGetHistogramOverTypeResistor): Promise<tOutGetHistogramOverTypeResistor> {
		let __args = args;

		try {
			return codec.send('OperatingData.GetHistogramOverTypeResistor(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutGetHistogramOverTypeResistor>((res,reject) => { reject(error);});
		}
	}

	export function GetHistogramOverTypeResistor(codec : any, index: Number): Promise<tOutGetHistogramOverTypeResistor> {
		return GetHistogramOverTypeResistorI(codec, {
				index: index
		});
	}

	export function ResetGetHistogramOverTypeResistorI(codec : any, args : tInResetGetHistogramOverTypeResistor): Promise<tOutResetGetHistogramOverTypeResistor> {
		let __args = args;

		try {
			return codec.send('OperatingData.ResetGetHistogramOverTypeResistor(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<tOutResetGetHistogramOverTypeResistor>((res,reject) => { reject(error);});
		}
	}

	export function ResetGetHistogramOverTypeResistor(codec : any, index: Number): Promise<tOutResetGetHistogramOverTypeResistor> {
		return ResetGetHistogramOverTypeResistorI(codec, {
				index: index
		});
	}
}

export namespace Parameterdata {
	/**
	 *  Input interface for Parameterdata.GetParameterDataNearest
	 */
	export interface tInGetParameterDataNearest {
		group: Number
		id: Number
	}
	/**
	 *  Input interface for Parameterdata.SetParameterDataNearest
	 */
	export interface tInSetParameterDataNearest {
		group: Number
		id: Number
		value: Number
	}
	/**
	 *  Input interface for Parameterdata.GetParameterDataMainMCU
	 */
	export interface tInGetParameterDataMainMCU {
		group: Number
		id: Number
	}
	/**
	 *  Input interface for Parameterdata.SetParameterDataMainMCU
	 */
	export interface tInSetParameterDataMainMCU {
		group: Number
		id: Number
		value: Number
	}
	/**
	 *  Input interface for Parameterdata.GetParameterData
	 */
	export interface tInGetParameterData {
		group: Number
		id: Number
	}
	/**
	 *  Input interface for Parameterdata.SetParameterData
	 */
	export interface tInSetParameterData {
		group: Number
		id: Number
	}
	/**
	 *  Input interface for Parameterdata.GetParameterDataTracker
	 */
	export interface tInGetParameterDataTracker {
		group: Number
		id: Number
	}
	/**
	 *  Input interface for Parameterdata.SetParameterDataTracker
	 */
	export interface tInSetParameterDataTracker {
		group: Number
		id: Number
		value: Number
	}

	export function GetParameterDataNearestI(codec : any, args : tInGetParameterDataNearest): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.GetParameterDataNearest(group: ' + __args.group+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetParameterDataNearest(codec : any, group: Number, id: Number): Promise<Number> {
		return GetParameterDataNearestI(codec, {
				group: group,
				id: id
		});
	}

	export function SetParameterDataNearestI(codec : any, args : tInSetParameterDataNearest): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.SetParameterDataNearest(group: ' + __args.group+ ',id: ' + __args.id+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterDataNearest(codec : any, group: Number, id: Number, value: Number): Promise<Number> {
		return SetParameterDataNearestI(codec, {
				group: group,
				id: id,
				value: value
		});
	}

	export function GetParameterDataMainMCUI(codec : any, args : tInGetParameterDataMainMCU): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.GetParameterDataMainMCU(group: ' + __args.group+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetParameterDataMainMCU(codec : any, group: Number, id: Number): Promise<Number> {
		return GetParameterDataMainMCUI(codec, {
				group: group,
				id: id
		});
	}

	export function SetParameterDataMainMCUI(codec : any, args : tInSetParameterDataMainMCU): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.SetParameterDataMainMCU(group: ' + __args.group+ ',id: ' + __args.id+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterDataMainMCU(codec : any, group: Number, id: Number, value: Number): Promise<Number> {
		return SetParameterDataMainMCUI(codec, {
				group: group,
				id: id,
				value: value
		});
	}

	export function GetParameterDataI(codec : any, args : tInGetParameterData): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.GetParameterData(group: ' + __args.group+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetParameterData(codec : any, group: Number, id: Number): Promise<Number> {
		return GetParameterDataI(codec, {
				group: group,
				id: id
		});
	}

	export function SetParameterDataI(codec : any, args : tInSetParameterData): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.SetParameterData(group: ' + __args.group+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterData(codec : any, group: Number, id: Number): Promise<Number> {
		return SetParameterDataI(codec, {
				group: group,
				id: id
		});
	}

	export function GetParameterDataTrackerI(codec : any, args : tInGetParameterDataTracker): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.GetParameterDataTracker(group: ' + __args.group+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetParameterDataTracker(codec : any, group: Number, id: Number): Promise<Number> {
		return GetParameterDataTrackerI(codec, {
				group: group,
				id: id
		});
	}

	export function SetParameterDataTrackerI(codec : any, args : tInSetParameterDataTracker): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Parameterdata.SetParameterDataTracker(group: ' + __args.group+ ',id: ' + __args.id+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetParameterDataTracker(codec : any, group: Number, id: Number, value: Number): Promise<Number> {
		return SetParameterDataTrackerI(codec, {
				group: group,
				id: id,
				value: value
		});
	}
}

export namespace PCBProductionInformation {
	/**
	 *  Input interface for PCBProductionInformation.SetInformation
	 */
	export interface tInSetInformation {
		type: Number
		revision: Number
		time: Number
		serialnumber: Number
	}
	/**
	 *  Input interface for PCBProductionInformation.SetProducerSerialNumber
	 */
	export interface tInSetProducerSerialNumber {
		serialnumber: Number
	}

	export function SetInformationI(codec : any, args : tInSetInformation): Promise<void> {
		let __args = args;

		try {
			return codec.send('PCBProductionInformation.SetInformation(type: ' + __args.type+ ',revision: ' + __args.revision+ ',time: ' + __args.time+ ',serialnumber: ' + __args.serialnumber+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetInformation(codec : any, type: Number, revision: Number, time: Number, serialnumber: Number): Promise<void> {
		return SetInformationI(codec, {
				type: type,
				revision: revision,
				time: time,
				serialnumber: serialnumber
		});
	}

	export function SetProducerSerialNumberI(codec : any, args : tInSetProducerSerialNumber): Promise<void> {
		let __args = args;

		try {
			return codec.send('PCBProductionInformation.SetProducerSerialNumber(serialnumber: ' + __args.serialnumber+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetProducerSerialNumber(codec : any, serialnumber: Number): Promise<void> {
		return SetProducerSerialNumberI(codec, {
				serialnumber: serialnumber
		});
	}
}

export namespace ProductionTestCommands {
	/**
	 *  Output interface for ProductionTestCommands.SetTestCommands
	 */
	export interface tOutSetTestCommands {
		test1: Number
		test2: Number
		test3: Number
	}
	/**
	 *  Input interface for ProductionTestCommands.SetTestCommands
	 */
	export interface tInSetTestCommands {
		testcommand: Number
		test1: Number
		test2: Number
		test3: Number
	}

	export function SetTestCommandsI(codec : any, args : tInSetTestCommands): Promise<tOutSetTestCommands> {
		let __args = args;

		try {
			return codec.send('ProductionTestCommands.SetTestCommands(testcommand: ' + __args.testcommand+ ',test1: ' + __args.test1+ ',test2: ' + __args.test2+ ',test3: ' + __args.test3+ ')');
		} catch(error) {
			return new Promise<tOutSetTestCommands>((res,reject) => { reject(error);});
		}
	}

	export function SetTestCommands(codec : any, testcommand: Number, test1: Number, test2: Number, test3: Number): Promise<tOutSetTestCommands> {
		return SetTestCommandsI(codec, {
				testcommand: testcommand,
				test1: test1,
				test2: test2,
				test3: test3
		});
	}
}

export namespace MowerControlCommands {

	export function SetStopMower(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('MowerControlCommands.SetStopMower()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSilentAlarm(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('MowerControlCommands.SetSilentAlarm()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}
}

export namespace Timer {
	/**
	 *  Output interface for Timer.GetAutotimer
	 */
	export interface tOutGetAutotimer {
		decreasetime: Number
		increasetime: Number
		enabled: Number
		predefinedtimer: Number
	}
	/**
	 *  Output interface for Timer.SetAutotimer
	 */
	export interface tOutSetAutotimer {
		decreasetime: Number
		increasetime: Number
		enabled: Number
		predefinedtimer: Number
	}
	/**
	 *  Input interface for Timer.SetAutotimer
	 */
	export interface tInSetAutotimer {
		decreasetime: Number
		increasetime: Number
		enabled: Number
	}
	/**
	 *  Output interface for Timer.SetClearTimer
	 */
	export interface tOutSetClearTimer {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Input interface for Timer.SetClearTimer
	 */
	export interface tInSetClearTimer {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Output interface for Timer.SetDisabled
	 */
	export interface tOutSetDisabled {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Input interface for Timer.SetDisabled
	 */
	export interface tInSetDisabled {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Output interface for Timer.SetFactoryReset
	 */
	export interface tOutSetFactoryReset {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Input interface for Timer.SetFactoryReset
	 */
	export interface tInSetFactoryReset {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Output interface for Timer.GetTimer
	 */
	export interface tOutGetTimer {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
		timermode: Number
	}
	/**
	 *  Input interface for Timer.GetTimer
	 */
	export interface tInGetTimer {
		timernumber: Number
	}
	/**
	 *  Output interface for Timer.SetTimer
	 */
	export interface tOutSetTimer {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
		timermode: Number
	}
	/**
	 *  Input interface for Timer.SetTimer
	 */
	export interface tInSetTimer {
		timernumber: Number
		timehour: Number
		timeminute: Number
		days: Number
		daycuttingtime: Number
	}
	/**
	 *  Output interface for Timer.GetTimestamp
	 */
	export interface tOutGetTimestamp {
		timestampnextstart: Number
		sourcenextstart: Number
		timestampnextweek: Number
	}
	/**
	 *  Output interface for Timer.GetTimeTable
	 */
	export interface tOutGetTimeTable {
		starttimerminutes0: Number
		starttimerdays0: Number
		starttimermodes0: Number
		starttimerminutes1: Number
		starttimerdays1: Number
		starttimermodes1: Number
		starttimerminutes2: Number
		starttimerdays2: Number
		starttimermodes2: Number
		starttimerminutes3: Number
		starttimerdays3: Number
		starttimermodes3: Number
		starttimerminutes4: Number
		starttimerdays4: Number
		starttimermodes4: Number
		starttimerminutes5: Number
		starttimerdays5: Number
		starttimermodes5: Number
		starttimerminutes6: Number
		starttimerdays6: Number
		starttimermodes6: Number
		starttimerminutes7: Number
		starttimerdays7: Number
		starttimermodes7: Number
		starttimerminutes8: Number
		starttimerdays8: Number
		starttimermodes8: Number
		starttimerminutes9: Number
		starttimerdays9: Number
		starttimermodes9: Number
		starttimerminutes10: Number
		starttimerdays10: Number
		starttimermodes10: Number
		starttimerminutes11: Number
		starttimerdays11: Number
		starttimermodes11: Number
		starttimerminutes12: Number
		starttimerdays12: Number
		starttimermodes12: Number
		starttimerminutes13: Number
		starttimerdays13: Number
		starttimermodes13: Number
		stoptimerminutes0: Number
		stoptimerdays0: Number
		stoptimermodes0: Number
		stoptimerminutes1: Number
		stoptimerdays1: Number
		stoptimermodes1: Number
		stoptimerminutes2: Number
		stoptimerdays2: Number
		stoptimermodes2: Number
		stoptimerminutes3: Number
		stoptimerdays3: Number
		stoptimermodes3: Number
		stoptimerminutes4: Number
		stoptimerdays4: Number
		stoptimermodes4: Number
		stoptimerminutes5: Number
		stoptimerdays5: Number
		stoptimermodes5: Number
		stoptimerminutes6: Number
		stoptimerdays6: Number
		stoptimermodes6: Number
		stoptimerminutes7: Number
		stoptimerdays7: Number
		stoptimermodes7: Number
		stoptimerminutes8: Number
		stoptimerdays8: Number
		stoptimermodes8: Number
		stoptimerminutes9: Number
		stoptimerdays9: Number
		stoptimermodes9: Number
		stoptimerminutes10: Number
		stoptimerdays10: Number
		stoptimermodes10: Number
		stoptimerminutes11: Number
		stoptimerdays11: Number
		stoptimermodes11: Number
		stoptimerminutes12: Number
		stoptimerdays12: Number
		stoptimermodes12: Number
		stoptimerminutes13: Number
		stoptimerdays13: Number
		stoptimermodes13: Number
	}
	/**
	 *  Output interface for Timer.SetTimeTable
	 */
	export interface tOutSetTimeTable {
		starttimerminutes0: Number
		starttimerdays0: Number
		starttimermodes0: Number
		starttimerminutes1: Number
		starttimerdays1: Number
		starttimermodes1: Number
		starttimerminutes2: Number
		starttimerdays2: Number
		starttimermodes2: Number
		starttimerminutes3: Number
		starttimerdays3: Number
		starttimermodes3: Number
		starttimerminutes4: Number
		starttimerdays4: Number
		starttimermodes4: Number
		starttimerminutes5: Number
		starttimerdays5: Number
		starttimermodes5: Number
		starttimerminutes6: Number
		starttimerdays6: Number
		starttimermodes6: Number
		starttimerminutes7: Number
		starttimerdays7: Number
		starttimermodes7: Number
		starttimerminutes8: Number
		starttimerdays8: Number
		starttimermodes8: Number
		starttimerminutes9: Number
		starttimerdays9: Number
		starttimermodes9: Number
		starttimerminutes10: Number
		starttimerdays10: Number
		starttimermodes10: Number
		starttimerminutes11: Number
		starttimerdays11: Number
		starttimermodes11: Number
		starttimerminutes12: Number
		starttimerdays12: Number
		starttimermodes12: Number
		starttimerminutes13: Number
		starttimerdays13: Number
		starttimermodes13: Number
		stoptimerminutes0: Number
		stoptimerdays0: Number
		stoptimermodes0: Number
		stoptimerminutes1: Number
		stoptimerdays1: Number
		stoptimermodes1: Number
		stoptimerminutes2: Number
		stoptimerdays2: Number
		stoptimermodes2: Number
		stoptimerminutes3: Number
		stoptimerdays3: Number
		stoptimermodes3: Number
		stoptimerminutes4: Number
		stoptimerdays4: Number
		stoptimermodes4: Number
		stoptimerminutes5: Number
		stoptimerdays5: Number
		stoptimermodes5: Number
		stoptimerminutes6: Number
		stoptimerdays6: Number
		stoptimermodes6: Number
		stoptimerminutes7: Number
		stoptimerdays7: Number
		stoptimermodes7: Number
		stoptimerminutes8: Number
		stoptimerdays8: Number
		stoptimermodes8: Number
		stoptimerminutes9: Number
		stoptimerdays9: Number
		stoptimermodes9: Number
		stoptimerminutes10: Number
		stoptimerdays10: Number
		stoptimermodes10: Number
		stoptimerminutes11: Number
		stoptimerdays11: Number
		stoptimermodes11: Number
		stoptimerminutes12: Number
		stoptimerdays12: Number
		stoptimermodes12: Number
		stoptimerminutes13: Number
		stoptimerdays13: Number
		stoptimermodes13: Number
	}
	/**
	 *  Input interface for Timer.SetTimeTable
	 */
	export interface tInSetTimeTable {
		starttimerminutes0: Number
		starttimerdays0: Number
		starttimermodes0: Number
		starttimerminutes1: Number
		starttimerdays1: Number
		starttimermodes1: Number
		starttimerminutes2: Number
		starttimerdays2: Number
		starttimermodes2: Number
		starttimerminutes3: Number
		starttimerdays3: Number
		starttimermodes3: Number
		starttimerminutes4: Number
		starttimerdays4: Number
		starttimermodes4: Number
		starttimerminutes5: Number
		starttimerdays5: Number
		starttimermodes5: Number
		starttimerminutes6: Number
		starttimerdays6: Number
		starttimermodes6: Number
		starttimerminutes7: Number
		starttimerdays7: Number
		starttimermodes7: Number
		starttimerminutes8: Number
		starttimerdays8: Number
		starttimermodes8: Number
		starttimerminutes9: Number
		starttimerdays9: Number
		starttimermodes9: Number
		starttimerminutes10: Number
		starttimerdays10: Number
		starttimermodes10: Number
		starttimerminutes11: Number
		starttimerdays11: Number
		starttimermodes11: Number
		starttimerminutes12: Number
		starttimerdays12: Number
		starttimermodes12: Number
		starttimerminutes13: Number
		starttimerdays13: Number
		starttimermodes13: Number
		stoptimerminutes0: Number
		stoptimerdays0: Number
		stoptimermodes0: Number
		stoptimerminutes1: Number
		stoptimerdays1: Number
		stoptimermodes1: Number
		stoptimerminutes2: Number
		stoptimerdays2: Number
		stoptimermodes2: Number
		stoptimerminutes3: Number
		stoptimerdays3: Number
		stoptimermodes3: Number
		stoptimerminutes4: Number
		stoptimerdays4: Number
		stoptimermodes4: Number
		stoptimerminutes5: Number
		stoptimerdays5: Number
		stoptimermodes5: Number
		stoptimerminutes6: Number
		stoptimerdays6: Number
		stoptimermodes6: Number
		stoptimerminutes7: Number
		stoptimerdays7: Number
		stoptimermodes7: Number
		stoptimerminutes8: Number
		stoptimerdays8: Number
		stoptimermodes8: Number
		stoptimerminutes9: Number
		stoptimerdays9: Number
		stoptimermodes9: Number
		stoptimerminutes10: Number
		stoptimerdays10: Number
		stoptimermodes10: Number
		stoptimerminutes11: Number
		stoptimerdays11: Number
		stoptimermodes11: Number
		stoptimerminutes12: Number
		stoptimerdays12: Number
		stoptimermodes12: Number
		stoptimerminutes13: Number
		stoptimerdays13: Number
		stoptimermodes13: Number
	}

	export function GetAutotimer(codec : any): Promise<tOutGetAutotimer> {
		let __args = {};

		try {
			return codec.send('Timer.GetAutotimer()');
		} catch(error) {
			return new Promise<tOutGetAutotimer>((res,reject) => { reject(error);});
		}
	}

	export function SetAutotimerI(codec : any, args : tInSetAutotimer): Promise<tOutSetAutotimer> {
		let __args = args;

		try {
			return codec.send('Timer.SetAutotimer(decreasetime: ' + __args.decreasetime+ ',increasetime: ' + __args.increasetime+ ',enabled: ' + __args.enabled+ ')');
		} catch(error) {
			return new Promise<tOutSetAutotimer>((res,reject) => { reject(error);});
		}
	}

	export function SetAutotimer(codec : any, decreasetime: Number, increasetime: Number, enabled: Number): Promise<tOutSetAutotimer> {
		return SetAutotimerI(codec, {
				decreasetime: decreasetime,
				increasetime: increasetime,
				enabled: enabled
		});
	}

	export function SetClearTimerI(codec : any, args : tInSetClearTimer): Promise<tOutSetClearTimer> {
		let __args = args;

		try {
			return codec.send('Timer.SetClearTimer(timernumber: ' + __args.timernumber+ ',timehour: ' + __args.timehour+ ',timeminute: ' + __args.timeminute+ ',days: ' + __args.days+ ',daycuttingtime: ' + __args.daycuttingtime+ ')');
		} catch(error) {
			return new Promise<tOutSetClearTimer>((res,reject) => { reject(error);});
		}
	}

	export function SetClearTimer(codec : any, timernumber: Number, timehour: Number, timeminute: Number, days: Number, daycuttingtime: Number): Promise<tOutSetClearTimer> {
		return SetClearTimerI(codec, {
				timernumber: timernumber,
				timehour: timehour,
				timeminute: timeminute,
				days: days,
				daycuttingtime: daycuttingtime
		});
	}

	export function SetDisabledI(codec : any, args : tInSetDisabled): Promise<tOutSetDisabled> {
		let __args = args;

		try {
			return codec.send('Timer.SetDisabled(timernumber: ' + __args.timernumber+ ',timehour: ' + __args.timehour+ ',timeminute: ' + __args.timeminute+ ',days: ' + __args.days+ ',daycuttingtime: ' + __args.daycuttingtime+ ')');
		} catch(error) {
			return new Promise<tOutSetDisabled>((res,reject) => { reject(error);});
		}
	}

	export function SetDisabled(codec : any, timernumber: Number, timehour: Number, timeminute: Number, days: Number, daycuttingtime: Number): Promise<tOutSetDisabled> {
		return SetDisabledI(codec, {
				timernumber: timernumber,
				timehour: timehour,
				timeminute: timeminute,
				days: days,
				daycuttingtime: daycuttingtime
		});
	}

	export function SetFactoryResetI(codec : any, args : tInSetFactoryReset): Promise<tOutSetFactoryReset> {
		let __args = args;

		try {
			return codec.send('Timer.SetFactoryReset(timernumber: ' + __args.timernumber+ ',timehour: ' + __args.timehour+ ',timeminute: ' + __args.timeminute+ ',days: ' + __args.days+ ',daycuttingtime: ' + __args.daycuttingtime+ ')');
		} catch(error) {
			return new Promise<tOutSetFactoryReset>((res,reject) => { reject(error);});
		}
	}

	export function SetFactoryReset(codec : any, timernumber: Number, timehour: Number, timeminute: Number, days: Number, daycuttingtime: Number): Promise<tOutSetFactoryReset> {
		return SetFactoryResetI(codec, {
				timernumber: timernumber,
				timehour: timehour,
				timeminute: timeminute,
				days: days,
				daycuttingtime: daycuttingtime
		});
	}

	export function GetTimerI(codec : any, args : tInGetTimer): Promise<tOutGetTimer> {
		let __args = args;

		try {
			return codec.send('Timer.GetTimer(timernumber: ' + __args.timernumber+ ')');
		} catch(error) {
			return new Promise<tOutGetTimer>((res,reject) => { reject(error);});
		}
	}

	export function GetTimer(codec : any, timernumber: Number): Promise<tOutGetTimer> {
		return GetTimerI(codec, {
				timernumber: timernumber
		});
	}

	export function SetTimerI(codec : any, args : tInSetTimer): Promise<tOutSetTimer> {
		let __args = args;

		try {
			return codec.send('Timer.SetTimer(timernumber: ' + __args.timernumber+ ',timehour: ' + __args.timehour+ ',timeminute: ' + __args.timeminute+ ',days: ' + __args.days+ ',daycuttingtime: ' + __args.daycuttingtime+ ')');
		} catch(error) {
			return new Promise<tOutSetTimer>((res,reject) => { reject(error);});
		}
	}

	export function SetTimer(codec : any, timernumber: Number, timehour: Number, timeminute: Number, days: Number, daycuttingtime: Number): Promise<tOutSetTimer> {
		return SetTimerI(codec, {
				timernumber: timernumber,
				timehour: timehour,
				timeminute: timeminute,
				days: days,
				daycuttingtime: daycuttingtime
		});
	}

	export function GetTimestamp(codec : any): Promise<tOutGetTimestamp> {
		let __args = {};

		try {
			return codec.send('Timer.GetTimestamp()');
		} catch(error) {
			return new Promise<tOutGetTimestamp>((res,reject) => { reject(error);});
		}
	}

	export function GetTimeTable(codec : any): Promise<tOutGetTimeTable> {
		let __args = {};

		try {
			return codec.send('Timer.GetTimeTable()');
		} catch(error) {
			return new Promise<tOutGetTimeTable>((res,reject) => { reject(error);});
		}
	}

	export function SetTimeTableI(codec : any, args : tInSetTimeTable): Promise<tOutSetTimeTable> {
		let __args = args;

		try {
			return codec.send('Timer.SetTimeTable(starttimerminutes0: ' + __args.starttimerminutes0+ ',starttimerdays0: ' + __args.starttimerdays0+ ',starttimermodes0: ' + __args.starttimermodes0+ ',starttimerminutes1: ' + __args.starttimerminutes1+ ',starttimerdays1: ' + __args.starttimerdays1+ ',starttimermodes1: ' + __args.starttimermodes1+ ',starttimerminutes2: ' + __args.starttimerminutes2+ ',starttimerdays2: ' + __args.starttimerdays2+ ',starttimermodes2: ' + __args.starttimermodes2+ ',starttimerminutes3: ' + __args.starttimerminutes3+ ',starttimerdays3: ' + __args.starttimerdays3+ ',starttimermodes3: ' + __args.starttimermodes3+ ',starttimerminutes4: ' + __args.starttimerminutes4+ ',starttimerdays4: ' + __args.starttimerdays4+ ',starttimermodes4: ' + __args.starttimermodes4+ ',starttimerminutes5: ' + __args.starttimerminutes5+ ',starttimerdays5: ' + __args.starttimerdays5+ ',starttimermodes5: ' + __args.starttimermodes5+ ',starttimerminutes6: ' + __args.starttimerminutes6+ ',starttimerdays6: ' + __args.starttimerdays6+ ',starttimermodes6: ' + __args.starttimermodes6+ ',starttimerminutes7: ' + __args.starttimerminutes7+ ',starttimerdays7: ' + __args.starttimerdays7+ ',starttimermodes7: ' + __args.starttimermodes7+ ',starttimerminutes8: ' + __args.starttimerminutes8+ ',starttimerdays8: ' + __args.starttimerdays8+ ',starttimermodes8: ' + __args.starttimermodes8+ ',starttimerminutes9: ' + __args.starttimerminutes9+ ',starttimerdays9: ' + __args.starttimerdays9+ ',starttimermodes9: ' + __args.starttimermodes9+ ',starttimerminutes10: ' + __args.starttimerminutes10+ ',starttimerdays10: ' + __args.starttimerdays10+ ',starttimermodes10: ' + __args.starttimermodes10+ ',starttimerminutes11: ' + __args.starttimerminutes11+ ',starttimerdays11: ' + __args.starttimerdays11+ ',starttimermodes11: ' + __args.starttimermodes11+ ',starttimerminutes12: ' + __args.starttimerminutes12+ ',starttimerdays12: ' + __args.starttimerdays12+ ',starttimermodes12: ' + __args.starttimermodes12+ ',starttimerminutes13: ' + __args.starttimerminutes13+ ',starttimerdays13: ' + __args.starttimerdays13+ ',starttimermodes13: ' + __args.starttimermodes13+ ',stoptimerminutes0: ' + __args.stoptimerminutes0+ ',stoptimerdays0: ' + __args.stoptimerdays0+ ',stoptimermodes0: ' + __args.stoptimermodes0+ ',stoptimerminutes1: ' + __args.stoptimerminutes1+ ',stoptimerdays1: ' + __args.stoptimerdays1+ ',stoptimermodes1: ' + __args.stoptimermodes1+ ',stoptimerminutes2: ' + __args.stoptimerminutes2+ ',stoptimerdays2: ' + __args.stoptimerdays2+ ',stoptimermodes2: ' + __args.stoptimermodes2+ ',stoptimerminutes3: ' + __args.stoptimerminutes3+ ',stoptimerdays3: ' + __args.stoptimerdays3+ ',stoptimermodes3: ' + __args.stoptimermodes3+ ',stoptimerminutes4: ' + __args.stoptimerminutes4+ ',stoptimerdays4: ' + __args.stoptimerdays4+ ',stoptimermodes4: ' + __args.stoptimermodes4+ ',stoptimerminutes5: ' + __args.stoptimerminutes5+ ',stoptimerdays5: ' + __args.stoptimerdays5+ ',stoptimermodes5: ' + __args.stoptimermodes5+ ',stoptimerminutes6: ' + __args.stoptimerminutes6+ ',stoptimerdays6: ' + __args.stoptimerdays6+ ',stoptimermodes6: ' + __args.stoptimermodes6+ ',stoptimerminutes7: ' + __args.stoptimerminutes7+ ',stoptimerdays7: ' + __args.stoptimerdays7+ ',stoptimermodes7: ' + __args.stoptimermodes7+ ',stoptimerminutes8: ' + __args.stoptimerminutes8+ ',stoptimerdays8: ' + __args.stoptimerdays8+ ',stoptimermodes8: ' + __args.stoptimermodes8+ ',stoptimerminutes9: ' + __args.stoptimerminutes9+ ',stoptimerdays9: ' + __args.stoptimerdays9+ ',stoptimermodes9: ' + __args.stoptimermodes9+ ',stoptimerminutes10: ' + __args.stoptimerminutes10+ ',stoptimerdays10: ' + __args.stoptimerdays10+ ',stoptimermodes10: ' + __args.stoptimermodes10+ ',stoptimerminutes11: ' + __args.stoptimerminutes11+ ',stoptimerdays11: ' + __args.stoptimerdays11+ ',stoptimermodes11: ' + __args.stoptimermodes11+ ',stoptimerminutes12: ' + __args.stoptimerminutes12+ ',stoptimerdays12: ' + __args.stoptimerdays12+ ',stoptimermodes12: ' + __args.stoptimermodes12+ ',stoptimerminutes13: ' + __args.stoptimerminutes13+ ',stoptimerdays13: ' + __args.stoptimerdays13+ ',stoptimermodes13: ' + __args.stoptimermodes13+ ')');
		} catch(error) {
			return new Promise<tOutSetTimeTable>((res,reject) => { reject(error);});
		}
	}

	export function SetTimeTable(codec : any, starttimerminutes0: Number, starttimerdays0: Number, starttimermodes0: Number, starttimerminutes1: Number, starttimerdays1: Number, starttimermodes1: Number, starttimerminutes2: Number, starttimerdays2: Number, starttimermodes2: Number, starttimerminutes3: Number, starttimerdays3: Number, starttimermodes3: Number, starttimerminutes4: Number, starttimerdays4: Number, starttimermodes4: Number, starttimerminutes5: Number, starttimerdays5: Number, starttimermodes5: Number, starttimerminutes6: Number, starttimerdays6: Number, starttimermodes6: Number, starttimerminutes7: Number, starttimerdays7: Number, starttimermodes7: Number, starttimerminutes8: Number, starttimerdays8: Number, starttimermodes8: Number, starttimerminutes9: Number, starttimerdays9: Number, starttimermodes9: Number, starttimerminutes10: Number, starttimerdays10: Number, starttimermodes10: Number, starttimerminutes11: Number, starttimerdays11: Number, starttimermodes11: Number, starttimerminutes12: Number, starttimerdays12: Number, starttimermodes12: Number, starttimerminutes13: Number, starttimerdays13: Number, starttimermodes13: Number, stoptimerminutes0: Number, stoptimerdays0: Number, stoptimermodes0: Number, stoptimerminutes1: Number, stoptimerdays1: Number, stoptimermodes1: Number, stoptimerminutes2: Number, stoptimerdays2: Number, stoptimermodes2: Number, stoptimerminutes3: Number, stoptimerdays3: Number, stoptimermodes3: Number, stoptimerminutes4: Number, stoptimerdays4: Number, stoptimermodes4: Number, stoptimerminutes5: Number, stoptimerdays5: Number, stoptimermodes5: Number, stoptimerminutes6: Number, stoptimerdays6: Number, stoptimermodes6: Number, stoptimerminutes7: Number, stoptimerdays7: Number, stoptimermodes7: Number, stoptimerminutes8: Number, stoptimerdays8: Number, stoptimermodes8: Number, stoptimerminutes9: Number, stoptimerdays9: Number, stoptimermodes9: Number, stoptimerminutes10: Number, stoptimerdays10: Number, stoptimermodes10: Number, stoptimerminutes11: Number, stoptimerdays11: Number, stoptimermodes11: Number, stoptimerminutes12: Number, stoptimerdays12: Number, stoptimermodes12: Number, stoptimerminutes13: Number, stoptimerdays13: Number, stoptimermodes13: Number): Promise<tOutSetTimeTable> {
		return SetTimeTableI(codec, {
				starttimerminutes0: starttimerminutes0,
				starttimerdays0: starttimerdays0,
				starttimermodes0: starttimermodes0,
				starttimerminutes1: starttimerminutes1,
				starttimerdays1: starttimerdays1,
				starttimermodes1: starttimermodes1,
				starttimerminutes2: starttimerminutes2,
				starttimerdays2: starttimerdays2,
				starttimermodes2: starttimermodes2,
				starttimerminutes3: starttimerminutes3,
				starttimerdays3: starttimerdays3,
				starttimermodes3: starttimermodes3,
				starttimerminutes4: starttimerminutes4,
				starttimerdays4: starttimerdays4,
				starttimermodes4: starttimermodes4,
				starttimerminutes5: starttimerminutes5,
				starttimerdays5: starttimerdays5,
				starttimermodes5: starttimermodes5,
				starttimerminutes6: starttimerminutes6,
				starttimerdays6: starttimerdays6,
				starttimermodes6: starttimermodes6,
				starttimerminutes7: starttimerminutes7,
				starttimerdays7: starttimerdays7,
				starttimermodes7: starttimermodes7,
				starttimerminutes8: starttimerminutes8,
				starttimerdays8: starttimerdays8,
				starttimermodes8: starttimermodes8,
				starttimerminutes9: starttimerminutes9,
				starttimerdays9: starttimerdays9,
				starttimermodes9: starttimermodes9,
				starttimerminutes10: starttimerminutes10,
				starttimerdays10: starttimerdays10,
				starttimermodes10: starttimermodes10,
				starttimerminutes11: starttimerminutes11,
				starttimerdays11: starttimerdays11,
				starttimermodes11: starttimermodes11,
				starttimerminutes12: starttimerminutes12,
				starttimerdays12: starttimerdays12,
				starttimermodes12: starttimermodes12,
				starttimerminutes13: starttimerminutes13,
				starttimerdays13: starttimerdays13,
				starttimermodes13: starttimermodes13,
				stoptimerminutes0: stoptimerminutes0,
				stoptimerdays0: stoptimerdays0,
				stoptimermodes0: stoptimermodes0,
				stoptimerminutes1: stoptimerminutes1,
				stoptimerdays1: stoptimerdays1,
				stoptimermodes1: stoptimermodes1,
				stoptimerminutes2: stoptimerminutes2,
				stoptimerdays2: stoptimerdays2,
				stoptimermodes2: stoptimermodes2,
				stoptimerminutes3: stoptimerminutes3,
				stoptimerdays3: stoptimerdays3,
				stoptimermodes3: stoptimermodes3,
				stoptimerminutes4: stoptimerminutes4,
				stoptimerdays4: stoptimerdays4,
				stoptimermodes4: stoptimermodes4,
				stoptimerminutes5: stoptimerminutes5,
				stoptimerdays5: stoptimerdays5,
				stoptimermodes5: stoptimermodes5,
				stoptimerminutes6: stoptimerminutes6,
				stoptimerdays6: stoptimerdays6,
				stoptimermodes6: stoptimermodes6,
				stoptimerminutes7: stoptimerminutes7,
				stoptimerdays7: stoptimerdays7,
				stoptimermodes7: stoptimermodes7,
				stoptimerminutes8: stoptimerminutes8,
				stoptimerdays8: stoptimerdays8,
				stoptimermodes8: stoptimermodes8,
				stoptimerminutes9: stoptimerminutes9,
				stoptimerdays9: stoptimerdays9,
				stoptimermodes9: stoptimermodes9,
				stoptimerminutes10: stoptimerminutes10,
				stoptimerdays10: stoptimerdays10,
				stoptimermodes10: stoptimermodes10,
				stoptimerminutes11: stoptimerminutes11,
				stoptimerdays11: stoptimerdays11,
				stoptimermodes11: stoptimermodes11,
				stoptimerminutes12: stoptimerminutes12,
				stoptimerdays12: stoptimerdays12,
				stoptimermodes12: stoptimermodes12,
				stoptimerminutes13: stoptimerminutes13,
				stoptimerdays13: stoptimerdays13,
				stoptimermodes13: stoptimermodes13
		});
	}
}

export namespace UltrasonicSetup {
	/**
	 *  Output interface for UltrasonicSetup.GetTrackingFilter
	 */
	export interface tOutGetTrackingFilter {
		distance: Number
		signal: Number
		object: Number
	}
	/**
	 *  Output interface for UltrasonicSetup.SetTrackingFilter
	 */
	export interface tOutSetTrackingFilter {
		distance: Number
		signal: Number
		object: Number
	}
	/**
	 *  Input interface for UltrasonicSetup.SetTrackingFilter
	 */
	export interface tInSetTrackingFilter {
		distance: Number
		signal: Number
		object: Number
	}
	/**
	 *  Output interface for UltrasonicSetup.GetTrackingParameters
	 */
	export interface tOutGetTrackingParameters {
		bodytype: Number
		sensitivity: Number
	}
	/**
	 *  Output interface for UltrasonicSetup.SetTrackingParameters
	 */
	export interface tOutSetTrackingParameters {
		bodytype: Number
		sensitivity: Number
	}
	/**
	 *  Input interface for UltrasonicSetup.SetTrackingParameters
	 */
	export interface tInSetTrackingParameters {
		bodytype: Number
		sensitivity: Number
	}
	/**
	 *  Input interface for UltrasonicSetup.SetSimulateNoObstacle
	 */
	export interface tInSetSimulateNoObstacle {
		active: Number
	}

	export function GetTrackingFilter(codec : any): Promise<tOutGetTrackingFilter> {
		let __args = {};

		try {
			return codec.send('UltrasonicSetup.GetTrackingFilter()');
		} catch(error) {
			return new Promise<tOutGetTrackingFilter>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackingFilterI(codec : any, args : tInSetTrackingFilter): Promise<tOutSetTrackingFilter> {
		let __args = args;

		try {
			return codec.send('UltrasonicSetup.SetTrackingFilter(distance: ' + __args.distance+ ',signal: ' + __args.signal+ ',object: ' + __args.object+ ')');
		} catch(error) {
			return new Promise<tOutSetTrackingFilter>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackingFilter(codec : any, distance: Number, signal: Number, object: Number): Promise<tOutSetTrackingFilter> {
		return SetTrackingFilterI(codec, {
				distance: distance,
				signal: signal,
				object: object
		});
	}

	export function GetTrackingParameters(codec : any): Promise<tOutGetTrackingParameters> {
		let __args = {};

		try {
			return codec.send('UltrasonicSetup.GetTrackingParameters()');
		} catch(error) {
			return new Promise<tOutGetTrackingParameters>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackingParametersI(codec : any, args : tInSetTrackingParameters): Promise<tOutSetTrackingParameters> {
		let __args = args;

		try {
			return codec.send('UltrasonicSetup.SetTrackingParameters(bodytype: ' + __args.bodytype+ ',sensitivity: ' + __args.sensitivity+ ')');
		} catch(error) {
			return new Promise<tOutSetTrackingParameters>((res,reject) => { reject(error);});
		}
	}

	export function SetTrackingParameters(codec : any, bodytype: Number, sensitivity: Number): Promise<tOutSetTrackingParameters> {
		return SetTrackingParametersI(codec, {
				bodytype: bodytype,
				sensitivity: sensitivity
		});
	}

	export function GetSimulateNoObstacle(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('UltrasonicSetup.GetSimulateNoObstacle()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulateNoObstacleI(codec : any, args : tInSetSimulateNoObstacle): Promise<Number> {
		let __args = args;

		try {
			return codec.send('UltrasonicSetup.SetSimulateNoObstacle(active: ' + __args.active+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulateNoObstacle(codec : any, active: Number): Promise<Number> {
		return SetSimulateNoObstacleI(codec, {
				active: active
		});
	}
}

export namespace Time {
	/**
	 *  Input interface for Time.SetSecondsSinceStart
	 */
	export interface tInSetSecondsSinceStart {
		secondsSinceStart: Number
	}

	export function MilliSecondsSinceStart(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('Time.MilliSecondsSinceStart()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SecondsSinceStart(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('Time.SecondsSinceStart()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSecondsSinceStartI(codec : any, args : tInSetSecondsSinceStart): Promise<void> {
		let __args = args;

		try {
			return codec.send('Time.SetSecondsSinceStart(secondsSinceStart: ' + __args.secondsSinceStart+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSecondsSinceStart(codec : any, secondsSinceStart: Number): Promise<void> {
		return SetSecondsSinceStartI(codec, {
				secondsSinceStart: secondsSinceStart
		});
	}
}

export namespace DigitalInput {
	/**
	 *  Input interface for DigitalInput.Get
	 */
	export interface tInGet {
		pinIndex: tIDigitalInput_PinIndex
	}

	export function GetI(codec : any, args : tInGet): Promise<Boolean> {
		let __args = args;

		try {
			return codec.send('DigitalInput.Get(pinIndex: ' + __args.pinIndex+ ')');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function Get(codec : any, pinIndex: tIDigitalInput_PinIndex): Promise<Boolean> {
		return GetI(codec, {
				pinIndex: pinIndex
		});
	}
}

export namespace BladeMotor {
	/**
	 *  Input interface for BladeMotor.SetSpeed
	 */
	export interface tInSetSpeed {
		speed: Number
	}
	/**
	 *  Input interface for BladeMotor.SetDirection
	 */
	export interface tInSetDirection {
		direction: Number
	}
	/**
	 *  Input interface for BladeMotor.SetSimulation
	 */
	export interface tInSetSimulation {
		onOff: Number
		current: Number
		speed: Number
		status: Number
	}

	export function Brake(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('BladeMotor.Brake()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Run(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('BladeMotor.Run()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetSpeed(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('BladeMotor.GetSpeed()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSpeedI(codec : any, args : tInSetSpeed): Promise<void> {
		let __args = args;

		try {
			return codec.send('BladeMotor.SetSpeed(speed: ' + __args.speed+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSpeed(codec : any, speed: Number): Promise<void> {
		return SetSpeedI(codec, {
				speed: speed
		});
	}

	export function GetDirection(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('BladeMotor.GetDirection()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetDirectionI(codec : any, args : tInSetDirection): Promise<void> {
		let __args = args;

		try {
			return codec.send('BladeMotor.SetDirection(direction: ' + __args.direction+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetDirection(codec : any, direction: Number): Promise<void> {
		return SetDirectionI(codec, {
				direction: direction
		});
	}

	export function GetMeasuredCurrent(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('BladeMotor.GetMeasuredCurrent()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetMeasuredSpeed(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('BladeMotor.GetMeasuredSpeed()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetRunningStatus(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('BladeMotor.GetRunningStatus()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function On(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('BladeMotor.On()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Off(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('BladeMotor.Off()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulationI(codec : any, args : tInSetSimulation): Promise<void> {
		let __args = args;

		try {
			return codec.send('BladeMotor.SetSimulation(onOff: ' + __args.onOff+ ',current: ' + __args.current+ ',speed: ' + __args.speed+ ',status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulation(codec : any, onOff: Number, current: Number, speed: Number, status: Number): Promise<void> {
		return SetSimulationI(codec, {
				onOff: onOff,
				current: current,
				speed: speed,
				status: status
		});
	}
}

export namespace CutIntensity {
	/**
	 *  Output interface for CutIntensity.GetData
	 */
	export interface tOutGetData {
		circularCondition: tCircularCondition
		cutIntensityStatus: tIntensiveCuttingStatus
		timestampLongTermAverage: Number
		currentLongTerm: Number
		currentShortTermAverage: Number
		currentShortTermAverage2: Number
		currentShortTermAverage3: Number
		currentFilt0: Number
		currentFilt1: Number
		filtCount0: Number
		filtCount1: Number
		filtCount2: Number
		filtCount3: Number
		localAverageCurrent: Number
		longAverageIntegrationTime_5min: Number
		localIntCutIntegrationTimeLimit_5min: Number
		localIntCutLevel_pro: Number
		localIntCutLevelEnter_long_mA: Number
		localIntCutLevelEnter_short_mA: Number
		localIntCutLevelExit_long_mA: Number
		localIntCutLevelExit_short_mA: Number
		localIntCutLevelExitHyst_long_mA: Number
		localIntCutLevelExitHyst_short_mA: Number
		localIntCount: Number
		timeAboveLocalIntCutLevel_100ms: Number
		delayTimeForTrig_100ms: Number
		localIntCutEnable: Number
		updateTimeGardenFilter_10s: Number
	}

	export function GetData(codec : any): Promise<tOutGetData> {
		let __args = {};

		try {
			return codec.send('CutIntensity.GetData()');
		} catch(error) {
			return new Promise<tOutGetData>((res,reject) => { reject(error);});
		}
	}
}

export namespace Wheels {
	/**
	 *  Input interface for Wheels.ClearHwBrakeSignal
	 */
	export interface tInClearHwBrakeSignal {
		index: Number
	}
	/**
	 *  Input interface for Wheels.GetDirection
	 */
	export interface tInGetDirection {
		index: Number
	}
	/**
	 *  Input interface for Wheels.GetHwBrakeSignal
	 */
	export interface tInGetHwBrakeSignal {
		index: Number
	}
	/**
	 *  Input interface for Wheels.GetPower
	 */
	export interface tInGetPower {
		index: Number
	}
	/**
	 *  Input interface for Wheels.GetRotationCounter
	 */
	export interface tInGetRotationCounter {
		index: Number
	}
	/**
	 *  Input interface for Wheels.GetSpeed
	 */
	export interface tInGetSpeed {
		index: Number
	}
	/**
	 *  Input interface for Wheels.RotationCounterToMm
	 */
	export interface tInRotationCounterToMm {
		counter: Number
	}
	/**
	 *  Input interface for Wheels.SetDirection
	 */
	export interface tInSetDirection {
		index: Number
		direction: Number
	}
	/**
	 *  Input interface for Wheels.SetPower
	 */
	export interface tInSetPower {
		index: Number
		power: Number
	}
	/**
	 *  Input interface for Wheels.SetWheelLock
	 */
	export interface tInSetWheelLock {
		wheelLock: Number
	}
	/**
	 *  Input interface for Wheels.RunWheels
	 */
	export interface tInRunWheels {
		powerLeft: Number
		powerRight: Number
	}
	/**
	 *  Input interface for Wheels.SetHold
	 */
	export interface tInSetHold {
		index: Number
	}

	export function ClearHwBrakeSignalI(codec : any, args : tInClearHwBrakeSignal): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.ClearHwBrakeSignal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ClearHwBrakeSignal(codec : any, index: Number): Promise<void> {
		return ClearHwBrakeSignalI(codec, {
				index: index
		});
	}

	export function EmergencyBrake(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Wheels.EmergencyBrake()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetDirectionI(codec : any, args : tInGetDirection): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.GetDirection(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetDirection(codec : any, index: Number): Promise<Number> {
		return GetDirectionI(codec, {
				index: index
		});
	}

	export function GetHwBrakeSignalI(codec : any, args : tInGetHwBrakeSignal): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.GetHwBrakeSignal(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetHwBrakeSignal(codec : any, index: Number): Promise<Number> {
		return GetHwBrakeSignalI(codec, {
				index: index
		});
	}

	export function GetPowerI(codec : any, args : tInGetPower): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.GetPower(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetPower(codec : any, index: Number): Promise<Number> {
		return GetPowerI(codec, {
				index: index
		});
	}

	export function GetRotationCounterI(codec : any, args : tInGetRotationCounter): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.GetRotationCounter(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetRotationCounter(codec : any, index: Number): Promise<Number> {
		return GetRotationCounterI(codec, {
				index: index
		});
	}

	export function GetSpeedI(codec : any, args : tInGetSpeed): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.GetSpeed(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetSpeed(codec : any, index: Number): Promise<Number> {
		return GetSpeedI(codec, {
				index: index
		});
	}

	export function IsRunning(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('Wheels.IsRunning()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function PowerOff(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Wheels.PowerOff()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function PowerOn(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Wheels.PowerOn()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function RotationCounterToMmI(codec : any, args : tInRotationCounterToMm): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Wheels.RotationCounterToMm(counter: ' + __args.counter+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function RotationCounterToMm(codec : any, counter: Number): Promise<Number> {
		return RotationCounterToMmI(codec, {
				counter: counter
		});
	}

	export function SetDirectionI(codec : any, args : tInSetDirection): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.SetDirection(index: ' + __args.index+ ',direction: ' + __args.direction+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetDirection(codec : any, index: Number, direction: Number): Promise<void> {
		return SetDirectionI(codec, {
				index: index,
				direction: direction
		});
	}

	export function SetPowerI(codec : any, args : tInSetPower): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.SetPower(index: ' + __args.index+ ',power: ' + __args.power+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPower(codec : any, index: Number, power: Number): Promise<void> {
		return SetPowerI(codec, {
				index: index,
				power: power
		});
	}

	export function SetWheelLockI(codec : any, args : tInSetWheelLock): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.SetWheelLock(wheelLock: ' + __args.wheelLock+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetWheelLock(codec : any, wheelLock: Number): Promise<void> {
		return SetWheelLockI(codec, {
				wheelLock: wheelLock
		});
	}

	export function RunWheelsI(codec : any, args : tInRunWheels): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.RunWheels(powerLeft: ' + __args.powerLeft+ ',powerRight: ' + __args.powerRight+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function RunWheels(codec : any, powerLeft: Number, powerRight: Number): Promise<void> {
		return RunWheelsI(codec, {
				powerLeft: powerLeft,
				powerRight: powerRight
		});
	}

	export function SetHoldI(codec : any, args : tInSetHold): Promise<void> {
		let __args = args;

		try {
			return codec.send('Wheels.SetHold(index: ' + __args.index+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetHold(codec : any, index: Number): Promise<void> {
		return SetHoldI(codec, {
				index: index
		});
	}
}

export namespace Traction {
	/**
	 *  Input interface for Traction.Brake
	 */
	export interface tInBrake {
		brakeDistance: Number
	}
	/**
	 *  Input interface for Traction.Run
	 */
	export interface tInRun {
		distance: Number
	}
	/**
	 *  Input interface for Traction.Turn
	 */
	export interface tInTurn {
		angle: Number
		distance: Number
	}
	/**
	 *  Input interface for Traction.TurnOneWheel
	 */
	export interface tInTurnOneWheel {
		angle: Number
	}

	export function BrakeI(codec : any, args : tInBrake): Promise<void> {
		let __args = args;

		try {
			return codec.send('Traction.Brake(brakeDistance: ' + __args.brakeDistance+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Brake(codec : any, brakeDistance: Number): Promise<void> {
		return BrakeI(codec, {
				brakeDistance: brakeDistance
		});
	}

	export function PowerOff(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Traction.PowerOff()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function PowerOn(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Traction.PowerOn()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function RunI(codec : any, args : tInRun): Promise<void> {
		let __args = args;

		try {
			return codec.send('Traction.Run(distance: ' + __args.distance+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Run(codec : any, distance: Number): Promise<void> {
		return RunI(codec, {
				distance: distance
		});
	}

	export function TurnI(codec : any, args : tInTurn): Promise<void> {
		let __args = args;

		try {
			return codec.send('Traction.Turn(angle: ' + __args.angle+ ',distance: ' + __args.distance+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Turn(codec : any, angle: Number, distance: Number): Promise<void> {
		return TurnI(codec, {
				angle: angle,
				distance: distance
		});
	}

	export function TurnOneWheelI(codec : any, args : tInTurnOneWheel): Promise<void> {
		let __args = args;

		try {
			return codec.send('Traction.TurnOneWheel(angle: ' + __args.angle+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function TurnOneWheel(codec : any, angle: Number): Promise<void> {
		return TurnOneWheelI(codec, {
				angle: angle
		});
	}
}

export namespace LiftSensor {
	/**
	 *  Input interface for LiftSensor.SetSimStatus
	 */
	export interface tInSetSimStatus {
		status: Number
	}

	export function SetSimStatusI(codec : any, args : tInSetSimStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('LiftSensor.SetSimStatus(status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatus(codec : any, status: Number): Promise<void> {
		return SetSimStatusI(codec, {
				status: status
		});
	}

	export function IsActivated(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('LiftSensor.IsActivated()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}
}

export namespace MainSwitch {
	/**
	 *  Input interface for MainSwitch.SetSimStatus
	 */
	export interface tInSetSimStatus {
		status: Number
	}

	export function SetSimStatusI(codec : any, args : tInSetSimStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('MainSwitch.SetSimStatus(status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatus(codec : any, status: Number): Promise<void> {
		return SetSimStatusI(codec, {
				status: status
		});
	}

	export function IsActivated(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MainSwitch.IsActivated()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}
}

export namespace StopButton {
	/**
	 *  Input interface for StopButton.SetSimStatus
	 */
	export interface tInSetSimStatus {
		status: Number
	}

	export function SetSimStatusI(codec : any, args : tInSetSimStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('StopButton.SetSimStatus(status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatus(codec : any, status: Number): Promise<void> {
		return SetSimStatusI(codec, {
				status: status
		});
	}

	export function IsActivated(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('StopButton.IsActivated()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}
}

export namespace Collision {
	/**
	 *  Output interface for Collision.GetStatus
	 */
	export interface tOutGetStatus {
		collisionFrontCenter: Boolean
		collisionRearRight: Boolean
		collisionRearLeft: Boolean
	}
	/**
	 *  Input interface for Collision.GetCounter
	 */
	export interface tInGetCounter {
		type: Number
	}
	/**
	 *  Input interface for Collision.SetSimulation
	 */
	export interface tInSetSimulation {
		onOff: Boolean
		status: Number
	}

	export function GetStatus(codec : any): Promise<tOutGetStatus> {
		let __args = {};

		try {
			return codec.send('Collision.GetStatus()');
		} catch(error) {
			return new Promise<tOutGetStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetCounterI(codec : any, args : tInGetCounter): Promise<Number> {
		let __args = args;

		try {
			return codec.send('Collision.GetCounter(type: ' + __args.type+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetCounter(codec : any, type: Number): Promise<Number> {
		return GetCounterI(codec, {
				type: type
		});
	}

	export function ClearCounters(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Collision.ClearCounters()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulationI(codec : any, args : tInSetSimulation): Promise<void> {
		let __args = args;

		try {
			return codec.send('Collision.SetSimulation(onOff: ' + __args.onOff+ ',status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimulation(codec : any, onOff: Boolean, status: Number): Promise<void> {
		return SetSimulationI(codec, {
				onOff: onOff,
				status: status
		});
	}
}

export namespace SAFETYSUPERVISOR_TIF_FAMILY {
	/**
	 *  Output interface for SAFETYSUPERVISOR_TIF_FAMILY.GetStatus
	 */
	export interface tOutGetStatus {
		stopButtonPressed: Boolean
		onOffSwitchInactive: Boolean
		lifted: Boolean
		upsideDown: Boolean
		tooMuchTilt: Boolean
		collision3s: Boolean
		tooFarOutsideBoundary: Boolean
		noLoopSignalWheels: Boolean
		pinCodeNeeded: Boolean
		twoSeperateActionsNeededBlade: Boolean
		twoSeperateActionsNeededWheels: Boolean
		warningSoundNeeded: Boolean
		chargingOngoing: Boolean
		noLoopSignalBlade: Boolean
		collisionIsActive: Boolean
		memNotValidated: Boolean
		blade10sLift: Boolean
		blade10sTilt: Boolean
		blade10sCollision: Boolean
		bladeUpSideDown: Boolean
	}
	/**
	 *  Input interface for SAFETYSUPERVISOR_TIF_FAMILY.OdometerReset
	 */
	export interface tInOdometerReset {
		odometerId: Number
	}
	/**
	 *  Input interface for SAFETYSUPERVISOR_TIF_FAMILY.OdometerGetRotDistance
	 */
	export interface tInOdometerGetRotDistance {
		odometerId: Number
	}
	/**
	 *  Input interface for SAFETYSUPERVISOR_TIF_FAMILY.OdometerGetMovDistance
	 */
	export interface tInOdometerGetMovDistance {
		odometerId: Number
	}
	/**
	 *  Output interface for SAFETYSUPERVISOR_TIF_FAMILY.GetSafeGates
	 */
	export interface tOutGetSafeGates {
		wheelsOkToStart: Boolean
		bladeOkToStart: Boolean
		heightOkToStart: Boolean
		chargerOkToCharge: Boolean
	}

	export function GetStatus(codec : any): Promise<tOutGetStatus> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.GetStatus()');
		} catch(error) {
			return new Promise<tOutGetStatus>((res,reject) => { reject(error);});
		}
	}

	export function OdometerResetI(codec : any, args : tInOdometerReset): Promise<void> {
		let __args = args;

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.OdometerReset(odometerId: ' + __args.odometerId+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function OdometerReset(codec : any, odometerId: Number): Promise<void> {
		return OdometerResetI(codec, {
				odometerId: odometerId
		});
	}

	export function OdometerGetRotDistanceI(codec : any, args : tInOdometerGetRotDistance): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.OdometerGetRotDistance(odometerId: ' + __args.odometerId+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function OdometerGetRotDistance(codec : any, odometerId: Number): Promise<Number> {
		return OdometerGetRotDistanceI(codec, {
				odometerId: odometerId
		});
	}

	export function OdometerGetMovDistanceI(codec : any, args : tInOdometerGetMovDistance): Promise<Number> {
		let __args = args;

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.OdometerGetMovDistance(odometerId: ' + __args.odometerId+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function OdometerGetMovDistance(codec : any, odometerId: Number): Promise<Number> {
		return OdometerGetMovDistanceI(codec, {
				odometerId: odometerId
		});
	}

	export function LoopSupervisorLoopDetected(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.LoopSupervisorLoopDetected()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function LoopSupervisorIsInsideLoop(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.LoopSupervisorIsInsideLoop()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function LoopSupervisorIsOnChargerStation(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.LoopSupervisorIsOnChargerStation()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function MotionSensorInMotion(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.MotionSensorInMotion()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function MotionSensorInMotionTimestamp(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.MotionSensorInMotionTimestamp()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function MotionSensorIsMovingForward(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.MotionSensorIsMovingForward()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function GetSafeGates(codec : any): Promise<tOutGetSafeGates> {
		let __args = {};

		try {
			return codec.send('SAFETYSUPERVISOR_TIF_FAMILY.GetSafeGates()');
		} catch(error) {
			return new Promise<tOutGetSafeGates>((res,reject) => { reject(error);});
		}
	}
}

export namespace SOUND_TIF_FAMILY {
	/**
	 *  Input interface for SOUND_TIF_FAMILY.SetSoundType
	 */
	export interface tInSetSoundType {
		soundType: tSoundType
	}

	export function SetSoundTypeI(codec : any, args : tInSetSoundType): Promise<void> {
		let __args = args;

		try {
			return codec.send('SOUND_TIF_FAMILY.SetSoundType(soundType: ' + __args.soundType+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSoundType(codec : any, soundType: tSoundType): Promise<void> {
		return SetSoundTypeI(codec, {
				soundType: soundType
		});
	}
}

export namespace PinValidator {

	export function IsPinCodeValid(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('PinValidator.IsPinCodeValid()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}
}

export namespace LoopSampler {
	/**
	 *  Input interface for LoopSampler.SetPeriodTime
	 */
	export interface tInSetPeriodTime {
		periodTime: Number
	}
	/**
	 *  Input interface for LoopSampler.GetLoopSignalMaster
	 */
	export interface tInGetLoopSignalMaster {
		loop: tILoopSamplerLoops
	}
	/**
	 *  Input interface for LoopSampler.GetLoopSignalSlave
	 */
	export interface tInGetLoopSignalSlave {
		loop: tILoopSamplerLoops
	}
	/**
	 *  Input interface for LoopSampler.SimulateEnable
	 */
	export interface tInSimulateEnable {
		enable: Boolean
	}
	/**
	 *  Input interface for LoopSampler.SimulateQuality
	 */
	export interface tInSimulateQuality {
		quality: Number
	}
	/**
	 *  Input interface for LoopSampler.SimulateSignalMaster
	 */
	export interface tInSimulateSignalMaster {
		loop: tILoopSamplerLoops
		value: Number
	}
	/**
	 *  Input interface for LoopSampler.SimulateSignalSlave
	 */
	export interface tInSimulateSignalSlave {
		loop: tILoopSamplerLoops
		value: Number
	}

	export function Disable(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('LoopSampler.Disable()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Enable(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('LoopSampler.Enable()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPeriodTimeI(codec : any, args : tInSetPeriodTime): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSampler.SetPeriodTime(periodTime: ' + __args.periodTime+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetPeriodTime(codec : any, periodTime: Number): Promise<void> {
		return SetPeriodTimeI(codec, {
				periodTime: periodTime
		});
	}

	export function GetLoopSignalMasterI(codec : any, args : tInGetLoopSignalMaster): Promise<Number> {
		let __args = args;

		try {
			return codec.send('LoopSampler.GetLoopSignalMaster(loop: ' + __args.loop+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetLoopSignalMaster(codec : any, loop: tILoopSamplerLoops): Promise<Number> {
		return GetLoopSignalMasterI(codec, {
				loop: loop
		});
	}

	export function GetLoopSignalSlaveI(codec : any, args : tInGetLoopSignalSlave): Promise<Number> {
		let __args = args;

		try {
			return codec.send('LoopSampler.GetLoopSignalSlave(loop: ' + __args.loop+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetLoopSignalSlave(codec : any, loop: tILoopSamplerLoops): Promise<Number> {
		return GetLoopSignalSlaveI(codec, {
				loop: loop
		});
	}

	export function GetPeriodTime(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('LoopSampler.GetPeriodTime()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetSignalQuality(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('LoopSampler.GetSignalQuality()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SimulateEnableI(codec : any, args : tInSimulateEnable): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSampler.SimulateEnable(enable: ' + __args.enable+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SimulateEnable(codec : any, enable: Boolean): Promise<void> {
		return SimulateEnableI(codec, {
				enable: enable
		});
	}

	export function SimulateQualityI(codec : any, args : tInSimulateQuality): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSampler.SimulateQuality(quality: ' + __args.quality+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SimulateQuality(codec : any, quality: Number): Promise<void> {
		return SimulateQualityI(codec, {
				quality: quality
		});
	}

	export function SimulateSignalMasterI(codec : any, args : tInSimulateSignalMaster): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSampler.SimulateSignalMaster(loop: ' + __args.loop+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SimulateSignalMaster(codec : any, loop: tILoopSamplerLoops, value: Number): Promise<void> {
		return SimulateSignalMasterI(codec, {
				loop: loop,
				value: value
		});
	}

	export function SimulateSignalSlaveI(codec : any, args : tInSimulateSignalSlave): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSampler.SimulateSignalSlave(loop: ' + __args.loop+ ',value: ' + __args.value+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SimulateSignalSlave(codec : any, loop: tILoopSamplerLoops, value: Number): Promise<void> {
		return SimulateSignalSlaveI(codec, {
				loop: loop,
				value: value
		});
	}
}

export namespace DigitalOutput {
	/**
	 *  Input interface for DigitalOutput.Set
	 */
	export interface tInSet {
		pinIndex: tIDigitalOutput_PinIndex
		output: Boolean
	}
	/**
	 *  Input interface for DigitalOutput.Get
	 */
	export interface tInGet {
		pinIndex: tIDigitalOutput_PinIndex
	}

	export function SetI(codec : any, args : tInSet): Promise<void> {
		let __args = args;

		try {
			return codec.send('DigitalOutput.Set(pinIndex: ' + __args.pinIndex+ ',output: ' + __args.output+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Set(codec : any, pinIndex: tIDigitalOutput_PinIndex, output: Boolean): Promise<void> {
		return SetI(codec, {
				pinIndex: pinIndex,
				output: output
		});
	}

	export function GetI(codec : any, args : tInGet): Promise<Boolean> {
		let __args = args;

		try {
			return codec.send('DigitalOutput.Get(pinIndex: ' + __args.pinIndex+ ')');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function Get(codec : any, pinIndex: tIDigitalOutput_PinIndex): Promise<Boolean> {
		return GetI(codec, {
				pinIndex: pinIndex
		});
	}
}

export namespace Charger {
	/**
	 *  Input interface for Charger.ChargingGateOff
	 */
	export interface tInChargingGateOff {
		gateIndex: Number
	}
	/**
	 *  Input interface for Charger.ChargingGateOn
	 */
	export interface tInChargingGateOn {
		gateIndex: Number
	}
	/**
	 *  Input interface for Charger.SetSimStatus
	 */
	export interface tInSetSimStatus {
		status: Number
	}

	export function ChargingOff(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('Charger.ChargingOff()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ChargingGateOffI(codec : any, args : tInChargingGateOff): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charger.ChargingGateOff(gateIndex: ' + __args.gateIndex+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ChargingGateOff(codec : any, gateIndex: Number): Promise<void> {
		return ChargingGateOffI(codec, {
				gateIndex: gateIndex
		});
	}

	export function ChargingGateOnI(codec : any, args : tInChargingGateOn): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charger.ChargingGateOn(gateIndex: ' + __args.gateIndex+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ChargingGateOn(codec : any, gateIndex: Number): Promise<void> {
		return ChargingGateOnI(codec, {
				gateIndex: gateIndex
		});
	}

	export function IsChargingEnabled(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('Charger.IsChargingEnabled()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function IsChargingPowerConnected(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('Charger.IsChargingPowerConnected()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatusI(codec : any, args : tInSetSimStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('Charger.SetSimStatus(status: ' + __args.status+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatus(codec : any, status: Number): Promise<void> {
		return SetSimStatusI(codec, {
				status: status
		});
	}
}

export namespace HeightMotor {
	/**
	 *  Input interface for HeightMotor.CalibrateAndSetHeight
	 */
	export interface tInCalibrateAndSetHeight {
		cuttingHeight: Number
	}
	/**
	 *  Output interface for HeightMotor.GetCuttingHeightData
	 */
	export interface tOutGetCuttingHeightData {
		targetHeight: Number
		initialHeight: Number
		currentHeight: Number
		motorCurrent: Number
		cuttingHeightStatus: Number
		cuttingHeightFault: Number
		timeToTargetHeight: Number
	}
	/**
	 *  Input interface for HeightMotor.SetHeight
	 */
	export interface tInSetHeight {
		height: Number
	}
	/**
	 *  Input interface for HeightMotor.SetHeightValueWithoutRunningMotor
	 */
	export interface tInSetHeightValueWithoutRunningMotor {
		height: Number
	}
	/**
	 *  Input interface for HeightMotor.InitialHeight
	 */
	export interface tInInitialHeight {
		currentHeight: Number
		targetHeight: Number
	}

	export function Brake(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HeightMotor.Brake()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function CalibrateAndSetHeightI(codec : any, args : tInCalibrateAndSetHeight): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HeightMotor.CalibrateAndSetHeight(cuttingHeight: ' + __args.cuttingHeight+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function CalibrateAndSetHeight(codec : any, cuttingHeight: Number): Promise<Number> {
		return CalibrateAndSetHeightI(codec, {
				cuttingHeight: cuttingHeight
		});
	}

	export function ConfirmFault(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HeightMotor.ConfirmFault()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GetCuttingHeightData(codec : any): Promise<tOutGetCuttingHeightData> {
		let __args = {};

		try {
			return codec.send('HeightMotor.GetCuttingHeightData()');
		} catch(error) {
			return new Promise<tOutGetCuttingHeightData>((res,reject) => { reject(error);});
		}
	}

	export function GetHeight(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HeightMotor.GetHeight()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function IsCalibrating(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HeightMotor.IsCalibrating()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function IsFault(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HeightMotor.IsFault()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function IsRunning(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('HeightMotor.IsRunning()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetHeightI(codec : any, args : tInSetHeight): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HeightMotor.SetHeight(height: ' + __args.height+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetHeight(codec : any, height: Number): Promise<Number> {
		return SetHeightI(codec, {
				height: height
		});
	}

	export function SetHeightValueWithoutRunningMotorI(codec : any, args : tInSetHeightValueWithoutRunningMotor): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HeightMotor.SetHeightValueWithoutRunningMotor(height: ' + __args.height+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetHeightValueWithoutRunningMotor(codec : any, height: Number): Promise<Number> {
		return SetHeightValueWithoutRunningMotorI(codec, {
				height: height
		});
	}

	export function InitialHeightI(codec : any, args : tInInitialHeight): Promise<Number> {
		let __args = args;

		try {
			return codec.send('HeightMotor.InitialHeight(currentHeight: ' + __args.currentHeight+ ',targetHeight: ' + __args.targetHeight+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function InitialHeight(codec : any, currentHeight: Number, targetHeight: Number): Promise<Number> {
		return InitialHeightI(codec, {
				currentHeight: currentHeight,
				targetHeight: targetHeight
		});
	}

	export function Start(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HeightMotor.Start()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}
}

export namespace Parameters {
	/**
	 *  Output interface for Parameters.ReadMem
	 */
	export interface tOutReadMem {
		retVal: tReturn
		length: Number
		data: Uint8Array
	}
	/**
	 *  Input interface for Parameters.ReadMem
	 */
	export interface tInReadMem {
		virtualAddr: Number
		length: Number
	}
	/**
	 *  Output interface for Parameters.WriteMem8
	 */
	export interface tOutWriteMem8 {
		retVal: tReturn
		writeResult: tNVRAMStatus
	}
	/**
	 *  Input interface for Parameters.WriteMem8
	 */
	export interface tInWriteMem8 {
		virtualAddr: Number
		data: Number
	}

	export function ReadMemI(codec : any, args : tInReadMem): Promise<tOutReadMem> {
		let __args = args;

		try {
			return codec.send('Parameters.ReadMem(virtualAddr: ' + __args.virtualAddr+ ',length: ' + __args.length+ ')');
		} catch(error) {
			return new Promise<tOutReadMem>((res,reject) => { reject(error);});
		}
	}

	export function ReadMem(codec : any, virtualAddr: Number, length: Number): Promise<tOutReadMem> {
		return ReadMemI(codec, {
				virtualAddr: virtualAddr,
				length: length
		});
	}

	export function WriteMem8I(codec : any, args : tInWriteMem8): Promise<tOutWriteMem8> {
		let __args = args;

		try {
			return codec.send('Parameters.WriteMem8(virtualAddr: ' + __args.virtualAddr+ ',data: ' + __args.data+ ')');
		} catch(error) {
			return new Promise<tOutWriteMem8>((res,reject) => { reject(error);});
		}
	}

	export function WriteMem8(codec : any, virtualAddr: Number, data: Number): Promise<tOutWriteMem8> {
		return WriteMem8I(codec, {
				virtualAddr: virtualAddr,
				data: data
		});
	}
}

export namespace LoopSystem {
	/**
	 *  Input interface for LoopSystem.SetScheduleMaster
	 */
	export interface tInSetScheduleMaster {
		loopSchedule: Number
	}
	/**
	 *  Input interface for LoopSystem.SetScheduleSlave
	 */
	export interface tInSetScheduleSlave {
		loopSchedule: Number
	}

	export function SetScheduleMasterI(codec : any, args : tInSetScheduleMaster): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSystem.SetScheduleMaster(loopSchedule: ' + __args.loopSchedule+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetScheduleMaster(codec : any, loopSchedule: Number): Promise<void> {
		return SetScheduleMasterI(codec, {
				loopSchedule: loopSchedule
		});
	}

	export function SetScheduleSlaveI(codec : any, args : tInSetScheduleSlave): Promise<void> {
		let __args = args;

		try {
			return codec.send('LoopSystem.SetScheduleSlave(loopSchedule: ' + __args.loopSchedule+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetScheduleSlave(codec : any, loopSchedule: Number): Promise<void> {
		return SetScheduleSlaveI(codec, {
				loopSchedule: loopSchedule
		});
	}
}

export namespace TiltSensor {
	/**
	 *  Input interface for TiltSensor.SetSimStatus
	 */
	export interface tInSetSimStatus {
		pitch100: Number
		roll100: Number
		zAcc_mg: Number
	}
	/**
	 *  Output interface for TiltSensor.GetFiltered
	 */
	export interface tOutGetFiltered {
		pitch100: Number
		roll100: Number
		zAcc_mg: Number
	}

	export function SetSimStatusI(codec : any, args : tInSetSimStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('TiltSensor.SetSimStatus(pitch100: ' + __args.pitch100+ ',roll100: ' + __args.roll100+ ',zAcc_mg: ' + __args.zAcc_mg+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetSimStatus(codec : any, pitch100: Number, roll100: Number, zAcc_mg: Number): Promise<void> {
		return SetSimStatusI(codec, {
				pitch100: pitch100,
				roll100: roll100,
				zAcc_mg: zAcc_mg
		});
	}

	export function GetFiltered(codec : any): Promise<tOutGetFiltered> {
		let __args = {};

		try {
			return codec.send('TiltSensor.GetFiltered()');
		} catch(error) {
			return new Promise<tOutGetFiltered>((res,reject) => { reject(error);});
		}
	}

	export function IsSensorOk(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('TiltSensor.IsSensorOk()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}
}

export namespace LinkManager {
	/**
	 *  Input interface for LinkManager.CreateLink
	 */
	export interface tInCreateLink {
		portId: tLinkManagerPortId
		linkId: tILinkManagerLinkId
	}
	/**
	 *  Input interface for LinkManager.Route
	 */
	export interface tInRoute {
		linkId: tILinkManagerLinkId
		routePortId: tLinkManagerPortId
	}
	/**
	 *  Input interface for LinkManager.RouteRaw
	 */
	export interface tInRouteRaw {
		linkId: tILinkManagerLinkId
		routePortId: tLinkManagerPortId
	}
	/**
	 *  Input interface for LinkManager.CloseRoute
	 */
	export interface tInCloseRoute {
		linkId: tILinkManagerLinkId
	}
	/**
	 *  Input interface for LinkManager.IsPacketTypeSupported
	 */
	export interface tInIsPacketTypeSupported {
		packetType: tILinkManagerPacketType
	}

	export function GetVersionString(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('LinkManager.GetVersionString()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function CreateLinkI(codec : any, args : tInCreateLink): Promise<void> {
		let __args = args;

		try {
			return codec.send('LinkManager.CreateLink(portId: ' + __args.portId+ ',linkId: ' + __args.linkId+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function CreateLink(codec : any, portId: tLinkManagerPortId, linkId: tILinkManagerLinkId): Promise<void> {
		return CreateLinkI(codec, {
				portId: portId,
				linkId: linkId
		});
	}

	export function RouteI(codec : any, args : tInRoute): Promise<void> {
		let __args = args;

		try {
			return codec.send('LinkManager.Route(linkId: ' + __args.linkId+ ',routePortId: ' + __args.routePortId+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Route(codec : any, linkId: tILinkManagerLinkId, routePortId: tLinkManagerPortId): Promise<void> {
		return RouteI(codec, {
				linkId: linkId,
				routePortId: routePortId
		});
	}

	export function RouteRawI(codec : any, args : tInRouteRaw): Promise<void> {
		let __args = args;

		try {
			return codec.send('LinkManager.RouteRaw(linkId: ' + __args.linkId+ ',routePortId: ' + __args.routePortId+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function RouteRaw(codec : any, linkId: tILinkManagerLinkId, routePortId: tLinkManagerPortId): Promise<void> {
		return RouteRawI(codec, {
				linkId: linkId,
				routePortId: routePortId
		});
	}

	export function CloseRouteI(codec : any, args : tInCloseRoute): Promise<void> {
		let __args = args;

		try {
			return codec.send('LinkManager.CloseRoute(linkId: ' + __args.linkId+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function CloseRoute(codec : any, linkId: tILinkManagerLinkId): Promise<void> {
		return CloseRouteI(codec, {
				linkId: linkId
		});
	}

	export function IsPacketTypeSupportedI(codec : any, args : tInIsPacketTypeSupported): Promise<Boolean> {
		let __args = args;

		try {
			return codec.send('LinkManager.IsPacketTypeSupported(packetType: ' + __args.packetType+ ')');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function IsPacketTypeSupported(codec : any, packetType: tILinkManagerPacketType): Promise<Boolean> {
		return IsPacketTypeSupportedI(codec, {
				packetType: packetType
		});
	}
}

export namespace DeviceInformation {
	/**
	 *  Output interface for DeviceInformation.GetDeviceIdentification
	 */
	export interface tOutGetDeviceIdentification {
		deviceTypeGroup: tDeviceTypeGroup
		mowerDeviceType: tMowerDeviceType
		mowerSerialNo: Number
		mowerVariantType: tMowerVariantType
	}
	/**
	 *  Output interface for DeviceInformation.GetMowerProductionData
	 */
	export interface tOutGetMowerProductionData {
		deviceTypeGroup: tDeviceTypeGroup
		mowerDeviceType: tMowerDeviceType
		mowerSerialNo: Number
		mowerProdTime: Date
		mainBoardType: Number
		mainBoardRev: Number
		mainBoardProdTime: Date
		mainBoardPCBASerialNo: Number
		mcuSerialNo: Uint8Array
		mowerVariantType: tMowerVariantType
	}
	/**
	 *  Output interface for DeviceInformation.GetMowerSubDevices
	 */
	export interface tOutGetMowerSubDevices {
		deviceTypeGroup: tDeviceTypeGroup
		MMIDeviceType: Number
		wheelMotorType: tWheelMotorType
		bladeMotorType: Number
		noOfBladeMotors: Number
		batteryAType: Number
		batteryBType: Number
		noOfLoopSensors: Number
		noOfCollisionSensors: Number
		noOfLiftSensors: Number
		extBuzzerType: Number
		bodyType: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetMowerSoftware
	 */
	export interface tOutGetMowerSoftware {
		deviceTypeGroup: tDeviceTypeGroup
		applicSwType: Number
		applicSwVer: Number
		applicSwBuildNo: Number
		swDescription: String
		applicSwTime: String
		applicSwDate: String
		bootSwType: Number
		bootSwVer: Number
		subDeviceSwType: Number
		subDeviceSwVer: Number
		subDeviceSwBuildNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetMmiInformation
	 */
	export interface tOutGetMmiInformation {
		deviceTypeGroup: tDeviceTypeGroup
		MMIDeviceType: Number
		MMISwType: Number
		MMISwVer: Number
		MMISwBuildNo: Number
		langVer: Number
		langBuildNo: Number
		langTime: String
		langDate: String
		MMIBootSwVer: Number
		MMIBoardType: Number
		MMIBoardRev: Number
		MMIBoardProdTime: Date
		MMIBoardPCBASerialNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.SetMmiInformation
	 */
	export interface tOutSetMmiInformation {
		deviceTypeGroup: tDeviceTypeGroup
		MMIDeviceType: Number
		MMISwType: Number
		MMISwVer: Number
		MMISwBuildNo: Number
		langVer: Number
		langBuildNo: Number
		langTime: String
		langDate: String
		MMIBootSwVer: Number
		MMIBoardType: Number
		MMIBoardRev: Number
		MMIBoardProdTime: Date
		MMIBoardPCBASerialNo: Number
	}
	/**
	 *  Input interface for DeviceInformation.SetMmiInformation
	 */
	export interface tInSetMmiInformation {
		deviceTypeGroup: tDeviceTypeGroup
		MMIDeviceType: Number
		MMISwType: Number
		MMISwVer: Number
		MMISwBuildNo: Number
		langVer: Number
		langBuildNo: Number
		langTime: String
		langDate: String
		MMIBootSwVer: Number
		MMIBoardType: Number
		MMIBoardRev: Number
		MMIBoardProdTime: Date
		MMIBoardPCBASerialNo: Number
	}
	/**
	 *  Input interface for DeviceInformation.SetMowerSerialNumber
	 */
	export interface tInSetMowerSerialNumber {
		mowerSerialNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.SetMowerDeviceType
	 */
	export interface tOutSetMowerDeviceType {
		mowerDeviceType: tMowerDeviceType
		mowerVariantType: tMowerVariantType
	}
	/**
	 *  Input interface for DeviceInformation.SetMowerDeviceType
	 */
	export interface tInSetMowerDeviceType {
		mowerDeviceType: tMowerDeviceType
		mowerVariantType: tMowerVariantType
	}
	/**
	 *  Input interface for DeviceInformation.SetMowerProductionTime
	 */
	export interface tInSetMowerProductionTime {
		tMowerProductionTime: Date
	}
	/**
	 *  Input interface for DeviceInformation.SetWheelMotorType
	 */
	export interface tInSetWheelMotorType {
		wheelMotorType: tWheelMotorType
	}
	/**
	 *  Input interface for DeviceInformation.SetBladeMotorType
	 */
	export interface tInSetBladeMotorType {
		bladeMotorType: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetChargingStationInformation
	 */
	export interface tOutGetChargingStationInformation {
		deviceType: tDeviceTypeGroup
		loopStatus: Number
		swVer: Number
		swBuild: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetUltrasonicInformation
	 */
	export interface tOutGetUltrasonicInformation {
		deviceTypeGroup: tDeviceTypeGroup
		deviceType: Number
		usSwType: Number
		usSwVer: Number
		usSwBuildNo: Number
		usBootSwType: Number
		usBootSwVer: Number
		usBoardType: Number
		usBoardRev: Number
		usBoardProdTime: Date
		usBoardPCBASerialNo: Number
	}
	/**
	 *  Input interface for DeviceInformation.SetBodyType
	 */
	export interface tInSetBodyType {
		bodyType: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetComBoardInformation
	 */
	export interface tOutGetComBoardInformation {
		deviceTypeGroup: tDeviceTypeGroup
		deviceType: Number
		swType: Number
		swVer: Number
		swBuildNo: Number
		bootSwType: Number
		bootSwVer: Number
		boardType: Number
		boardRev: Number
		boardProdTime: Date
		boardPCBASerialNo: Number
		comBoardSpecific1: String
		comBoardSpecific2: String
		comBoardSpecific3: String
		mowerSubDeviceSwType: Number
		mowerSubDeviceSwVer: Number
		mowerSubDeviceSwBuildNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.SetComBoardInformation
	 */
	export interface tOutSetComBoardInformation {
		deviceTypeGroup: tDeviceTypeGroup
		deviceType: Number
		swType: Number
		swVer: Number
		swBuildNo: Number
		bootSwType: Number
		bootSwVer: Number
		boardType: Number
		boardRev: Number
		boardProdTime: Date
		boardPCBASerialNo: Number
		comBoardSpecific1: String
		comBoardSpecific2: String
		comBoardSpecific3: String
		mowerSubDeviceSwType: Number
		mowerSubDeviceSwVer: Number
		mowerSubDeviceSwBuildNo: Number
	}
	/**
	 *  Input interface for DeviceInformation.SetComBoardInformation
	 */
	export interface tInSetComBoardInformation {
		deviceTypeGroup: tDeviceTypeGroup
		deviceType: Number
		swType: Number
		swVer: Number
		swBuildNo: Number
		bootSwType: Number
		bootSwVer: Number
		boardType: Number
		boardRev: Number
		boardProdTime: Date
		boardPCBASerialNo: Number
		comBoardSpecific1: String
		comBoardSpecific2: String
		comBoardSpecific3: String
		mowerSubDeviceSwType: Number
		mowerSubDeviceSwVer: Number
		mowerSubDeviceSwBuildNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetMowerInformation
	 */
	export interface tOutGetMowerInformation {
		deviceTypeGroup: tDeviceTypeGroup
		mowerDeviceType: tMowerDeviceType
		mowerVariantType: tMowerVariantType
		mowerApplicSwType: Number
		mowerApplicSwVer: Number
		mowerApplicSwBuildNo: Number
		mowerBootSwType: Number
		mowerBootSwVer: Number
		mowerSubDeviceSwType: Number
		mowerSubDeviceSwVer: Number
		mowerSubDeviceSwBuildNo: Number
		mowerSerialNo: Number
		mowerProdTime: Date
		mainBoardType: Number
		mainBoardRev: Number
		mainBoardProdTime: Date
		mainBoardPCBASerialNo: Number
	}
	/**
	 *  Output interface for DeviceInformation.GetRadioModuleInformation
	 */
	export interface tOutGetRadioModuleInformation {
		deviceTypeGroup: tDeviceTypeGroup
		deviceType: Number
		swType: Number
		swVer: Number
		swBuildNo: Number
		bootSwType: Number
		bootSwVer: Number
		boardType: Number
		boardRev: Number
		boardProdTime: Date
		boardPCBASerialNo: Number
		comBoardSpecific1: String
		comBoardSpecific2: String
		comBoardSpecific3: String
		mowerSubDeviceSwType: Number
		mowerSubDeviceSwVer: Number
		mowerSubDeviceSwBuildNo: Number
	}
	/**
	 *  Input interface for DeviceInformation.SetMowerModelName
	 */
	export interface tInSetMowerModelName {
		mowerModelName: String
	}
	/**
	 *  Input interface for DeviceInformation.SetMmiVersionString
	 */
	export interface tInSetMmiVersionString {
		versionString: String
	}
	/**
	 *  Input interface for DeviceInformation.SetComBoardVersionString
	 */
	export interface tInSetComBoardVersionString {
		versionString: String
	}

	export function GetDeviceIdentification(codec : any): Promise<tOutGetDeviceIdentification> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetDeviceIdentification()');
		} catch(error) {
			return new Promise<tOutGetDeviceIdentification>((res,reject) => { reject(error);});
		}
	}

	export function GetMowerProductionData(codec : any): Promise<tOutGetMowerProductionData> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMowerProductionData()');
		} catch(error) {
			return new Promise<tOutGetMowerProductionData>((res,reject) => { reject(error);});
		}
	}

	export function GetMowerSubDevices(codec : any): Promise<tOutGetMowerSubDevices> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMowerSubDevices()');
		} catch(error) {
			return new Promise<tOutGetMowerSubDevices>((res,reject) => { reject(error);});
		}
	}

	export function GetMowerSoftware(codec : any): Promise<tOutGetMowerSoftware> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMowerSoftware()');
		} catch(error) {
			return new Promise<tOutGetMowerSoftware>((res,reject) => { reject(error);});
		}
	}

	export function GetMmiInformation(codec : any): Promise<tOutGetMmiInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMmiInformation()');
		} catch(error) {
			return new Promise<tOutGetMmiInformation>((res,reject) => { reject(error);});
		}
	}

	export function SetMmiInformationI(codec : any, args : tInSetMmiInformation): Promise<tOutSetMmiInformation> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMmiInformation(deviceTypeGroup: ' + __args.deviceTypeGroup+ ',MMIDeviceType: ' + __args.MMIDeviceType+ ',MMISwType: ' + __args.MMISwType+ ',MMISwVer: ' + __args.MMISwVer+ ',MMISwBuildNo: ' + __args.MMISwBuildNo+ ',langVer: ' + __args.langVer+ ',langBuildNo: ' + __args.langBuildNo+ ',langTime: ' + __args.langTime+ ',langDate: ' + __args.langDate+ ',MMIBootSwVer: ' + __args.MMIBootSwVer+ ',MMIBoardType: ' + __args.MMIBoardType+ ',MMIBoardRev: ' + __args.MMIBoardRev+ ',MMIBoardProdTime: ' + __args.MMIBoardProdTime+ ',MMIBoardPCBASerialNo: ' + __args.MMIBoardPCBASerialNo+ ')');
		} catch(error) {
			return new Promise<tOutSetMmiInformation>((res,reject) => { reject(error);});
		}
	}

	export function SetMmiInformation(codec : any, deviceTypeGroup: tDeviceTypeGroup, MMIDeviceType: Number, MMISwType: Number, MMISwVer: Number, MMISwBuildNo: Number, langVer: Number, langBuildNo: Number, langTime: String, langDate: String, MMIBootSwVer: Number, MMIBoardType: Number, MMIBoardRev: Number, MMIBoardProdTime: Date, MMIBoardPCBASerialNo: Number): Promise<tOutSetMmiInformation> {
		return SetMmiInformationI(codec, {
				deviceTypeGroup: deviceTypeGroup,
				MMIDeviceType: MMIDeviceType,
				MMISwType: MMISwType,
				MMISwVer: MMISwVer,
				MMISwBuildNo: MMISwBuildNo,
				langVer: langVer,
				langBuildNo: langBuildNo,
				langTime: langTime,
				langDate: langDate,
				MMIBootSwVer: MMIBootSwVer,
				MMIBoardType: MMIBoardType,
				MMIBoardRev: MMIBoardRev,
				MMIBoardProdTime: MMIBoardProdTime,
				MMIBoardPCBASerialNo: MMIBoardPCBASerialNo
		});
	}

	export function SetMowerSerialNumberI(codec : any, args : tInSetMowerSerialNumber): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMowerSerialNumber(mowerSerialNo: ' + __args.mowerSerialNo+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerSerialNumber(codec : any, mowerSerialNo: Number): Promise<Number> {
		return SetMowerSerialNumberI(codec, {
				mowerSerialNo: mowerSerialNo
		});
	}

	export function SetMowerDeviceTypeI(codec : any, args : tInSetMowerDeviceType): Promise<tOutSetMowerDeviceType> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMowerDeviceType(mowerDeviceType: ' + __args.mowerDeviceType+ ',mowerVariantType: ' + __args.mowerVariantType+ ')');
		} catch(error) {
			return new Promise<tOutSetMowerDeviceType>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerDeviceType(codec : any, mowerDeviceType: tMowerDeviceType, mowerVariantType: tMowerVariantType): Promise<tOutSetMowerDeviceType> {
		return SetMowerDeviceTypeI(codec, {
				mowerDeviceType: mowerDeviceType,
				mowerVariantType: mowerVariantType
		});
	}

	export function SetMowerProductionTimeI(codec : any, args : tInSetMowerProductionTime): Promise<Date> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMowerProductionTime(tMowerProductionTime: ' + __args.tMowerProductionTime+ ')');
		} catch(error) {
			return new Promise<Date>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerProductionTime(codec : any, tMowerProductionTime: Date): Promise<Date> {
		return SetMowerProductionTimeI(codec, {
				tMowerProductionTime: tMowerProductionTime
		});
	}

	export function SetWheelMotorTypeI(codec : any, args : tInSetWheelMotorType): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetWheelMotorType(wheelMotorType: ' + __args.wheelMotorType+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetWheelMotorType(codec : any, wheelMotorType: tWheelMotorType): Promise<Number> {
		return SetWheelMotorTypeI(codec, {
				wheelMotorType: wheelMotorType
		});
	}

	export function SetBladeMotorTypeI(codec : any, args : tInSetBladeMotorType): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetBladeMotorType(bladeMotorType: ' + __args.bladeMotorType+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetBladeMotorType(codec : any, bladeMotorType: Number): Promise<Number> {
		return SetBladeMotorTypeI(codec, {
				bladeMotorType: bladeMotorType
		});
	}

	export function GetChargingStationInformation(codec : any): Promise<tOutGetChargingStationInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetChargingStationInformation()');
		} catch(error) {
			return new Promise<tOutGetChargingStationInformation>((res,reject) => { reject(error);});
		}
	}

	export function GetUltrasonicInformation(codec : any): Promise<tOutGetUltrasonicInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetUltrasonicInformation()');
		} catch(error) {
			return new Promise<tOutGetUltrasonicInformation>((res,reject) => { reject(error);});
		}
	}

	export function SetBodyTypeI(codec : any, args : tInSetBodyType): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetBodyType(bodyType: ' + __args.bodyType+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetBodyType(codec : any, bodyType: Number): Promise<Number> {
		return SetBodyTypeI(codec, {
				bodyType: bodyType
		});
	}

	export function GetComBoardInformation(codec : any): Promise<tOutGetComBoardInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetComBoardInformation()');
		} catch(error) {
			return new Promise<tOutGetComBoardInformation>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardInformationI(codec : any, args : tInSetComBoardInformation): Promise<tOutSetComBoardInformation> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetComBoardInformation(deviceTypeGroup: ' + __args.deviceTypeGroup+ ',deviceType: ' + __args.deviceType+ ',swType: ' + __args.swType+ ',swVer: ' + __args.swVer+ ',swBuildNo: ' + __args.swBuildNo+ ',bootSwType: ' + __args.bootSwType+ ',bootSwVer: ' + __args.bootSwVer+ ',boardType: ' + __args.boardType+ ',boardRev: ' + __args.boardRev+ ',boardProdTime: ' + __args.boardProdTime+ ',boardPCBASerialNo: ' + __args.boardPCBASerialNo+ ',comBoardSpecific1: ' + __args.comBoardSpecific1+ ',comBoardSpecific2: ' + __args.comBoardSpecific2+ ',comBoardSpecific3: ' + __args.comBoardSpecific3+ ',mowerSubDeviceSwType: ' + __args.mowerSubDeviceSwType+ ',mowerSubDeviceSwVer: ' + __args.mowerSubDeviceSwVer+ ',mowerSubDeviceSwBuildNo: ' + __args.mowerSubDeviceSwBuildNo+ ')');
		} catch(error) {
			return new Promise<tOutSetComBoardInformation>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardInformation(codec : any, deviceTypeGroup: tDeviceTypeGroup, deviceType: Number, swType: Number, swVer: Number, swBuildNo: Number, bootSwType: Number, bootSwVer: Number, boardType: Number, boardRev: Number, boardProdTime: Date, boardPCBASerialNo: Number, comBoardSpecific1: String, comBoardSpecific2: String, comBoardSpecific3: String, mowerSubDeviceSwType: Number, mowerSubDeviceSwVer: Number, mowerSubDeviceSwBuildNo: Number): Promise<tOutSetComBoardInformation> {
		return SetComBoardInformationI(codec, {
				deviceTypeGroup: deviceTypeGroup,
				deviceType: deviceType,
				swType: swType,
				swVer: swVer,
				swBuildNo: swBuildNo,
				bootSwType: bootSwType,
				bootSwVer: bootSwVer,
				boardType: boardType,
				boardRev: boardRev,
				boardProdTime: boardProdTime,
				boardPCBASerialNo: boardPCBASerialNo,
				comBoardSpecific1: comBoardSpecific1,
				comBoardSpecific2: comBoardSpecific2,
				comBoardSpecific3: comBoardSpecific3,
				mowerSubDeviceSwType: mowerSubDeviceSwType,
				mowerSubDeviceSwVer: mowerSubDeviceSwVer,
				mowerSubDeviceSwBuildNo: mowerSubDeviceSwBuildNo
		});
	}

	export function GetMowerInformation(codec : any): Promise<tOutGetMowerInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMowerInformation()');
		} catch(error) {
			return new Promise<tOutGetMowerInformation>((res,reject) => { reject(error);});
		}
	}

	export function GetRadioModuleInformation(codec : any): Promise<tOutGetRadioModuleInformation> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetRadioModuleInformation()');
		} catch(error) {
			return new Promise<tOutGetRadioModuleInformation>((res,reject) => { reject(error);});
		}
	}

	export function GetMowerModelName(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMowerModelName()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerModelNameI(codec : any, args : tInSetMowerModelName): Promise<String> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMowerModelName(mowerModelName: ' + __args.mowerModelName+ ')');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetMowerModelName(codec : any, mowerModelName: String): Promise<String> {
		return SetMowerModelNameI(codec, {
				mowerModelName: mowerModelName
		});
	}

	export function GetMmiVersionString(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetMmiVersionString()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetMmiVersionStringI(codec : any, args : tInSetMmiVersionString): Promise<void> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetMmiVersionString(versionString: ' + __args.versionString+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetMmiVersionString(codec : any, versionString: String): Promise<void> {
		return SetMmiVersionStringI(codec, {
				versionString: versionString
		});
	}

	export function GetComBoardVersionString(codec : any): Promise<String> {
		let __args = {};

		try {
			return codec.send('DeviceInformation.GetComBoardVersionString()');
		} catch(error) {
			return new Promise<String>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardVersionStringI(codec : any, args : tInSetComBoardVersionString): Promise<void> {
		let __args = args;

		try {
			return codec.send('DeviceInformation.SetComBoardVersionString(versionString: ' + __args.versionString+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function SetComBoardVersionString(codec : any, versionString: String): Promise<void> {
		return SetComBoardVersionStringI(codec, {
				versionString: versionString
		});
	}
}

export namespace DrivingSettings {
	/**
	 *  Output interface for DrivingSettings.GetSubareaSettings
	 */
	export interface tOutGetSubareaSettings {
		subareaId: Number
		gardenShape: Number
		localIntCutLevel: Number
		cutCurrentIntTime: Number
		maxConfigWheelSpeed: Number
		localIntCutEnable: Number
		predefinedIntLevel: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetSubareaSettings
	 */
	export interface tInGetSubareaSettings {
		subareaId: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetExitAngles
	 */
	export interface tOutGetExitAngles {
		reversingDistance: Number
		minAngle1: Number
		maxAngle1: Number
		minAngle2: Number
		maxAngle2: Number
		propFirstSector: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetCorridor
	 */
	export interface tOutGetCorridor {
		loopWire: Number
		minDistToWire: Number
		maxDistToWire: Number
		wireInGuideCorridor: Number
		autoDistanceEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetCorridor
	 */
	export interface tInGetCorridor {
		loopWire: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetFollowWireOut
	 */
	export interface tOutGetFollowWireOut {
		startPositionId: Number
		loopWire: Number
		runningDistance: Number
		proportion: Number
		startPositionEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetFollowWireOut
	 */
	export interface tInGetFollowWireOut {
		startPositionId: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetFollowWireIn
	 */
	export interface tOutGetFollowWireIn {
		loopWire: Number
		delayTime: Number
		followWireInEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetFollowWireIn
	 */
	export interface tInGetFollowWireIn {
		loopWire: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetTestFollowWireOut
	 */
	export interface tOutGetTestFollowWireOut {
		startPositionId: Number
		minMaxDistance: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetTestFollowWireOut
	 */
	export interface tInGetTestFollowWireOut {
		forFutureUse: Number
	}
	/**
	 *  Input interface for DrivingSettings.GetTestFollowWireIn
	 */
	export interface tInGetTestFollowWireIn {
		forFutureUse: Number
	}
	/**
	 *  Output interface for DrivingSettings.GetFollowGpsPosOut
	 */
	export interface tOutGetFollowGpsPosOut {
		xPos: Number
		yPos: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetSubareaSettings
	 */
	export interface tOutSetSubareaSettings {
		subareaId: Number
		gardenShape: Number
		localIntCutLevel: Number
		cutCurrentIntTime: Number
		maxConfigWheelSpeed: Number
		localIntCutEnable: Number
		predefinedIntLevel: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetSubareaSettings
	 */
	export interface tInSetSubareaSettings {
		subareaId: Number
		gardenShape: Number
		localIntCutLevel: Number
		cutCurrentIntTime: Number
		maxConfigWheelSpeed: Number
		localIntCutEnable: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetExitAngles
	 */
	export interface tOutSetExitAngles {
		reversingDistance: Number
		minAngle1: Number
		maxAngle1: Number
		minAngle2: Number
		maxAngle2: Number
		propFirstSector: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetExitAngles
	 */
	export interface tInSetExitAngles {
		reversingDistance: Number
		minAngle1: Number
		maxAngle1: Number
		minAngle2: Number
		maxAngle2: Number
		propFirstSector: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetCorridor
	 */
	export interface tOutSetCorridor {
		loopWire: Number
		minDistToWire: Number
		maxDistToWire: Number
		wireInGuideCorridor: Number
		autoDistanceEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetCorridor
	 */
	export interface tInSetCorridor {
		loopWire: Number
		minDistToWire: Number
		maxDistToWire: Number
		wireInGuideCorridor: Number
		autoDistanceEnable: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetFollowWireOut
	 */
	export interface tOutSetFollowWireOut {
		startPositionId: Number
		loopWire: Number
		runningDistance: Number
		proportion: Number
		startPositionEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetFollowWireOut
	 */
	export interface tInSetFollowWireOut {
		startPositionId: Number
		loopWire: Number
		runningDistance: Number
		proportion: Number
		startPositionEnable: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetFollowWireIn
	 */
	export interface tOutSetFollowWireIn {
		loopWire: Number
		delayTime: Number
		followWireInEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetFollowWireIn
	 */
	export interface tInSetFollowWireIn {
		loopWire: Number
		delayTime: Number
		followWireInEnable: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetTestFollowWireOut
	 */
	export interface tOutSetTestFollowWireOut {
		startPositionId: Number
		minMaxDistance: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetTestFollowWireOut
	 */
	export interface tInSetTestFollowWireOut {
		startPositionId: Number
		minMaxDistance: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetTestFollowWireIn
	 */
	export interface tInSetTestFollowWireIn {
		loopWire: Number
	}
	/**
	 *  Output interface for DrivingSettings.SetFollowGpsPosOut
	 */
	export interface tOutSetFollowGpsPosOut {
		xPos: Number
		yPos: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetFollowGpsPosOut
	 */
	export interface tInSetFollowGpsPosOut {
		xPos: Number
		yPos: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetGpsSettings
	 */
	export interface tInSetGpsSettings {
		GPSNavigationEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetCSRange
	 */
	export interface tInSetCSRange {
		range: Number
	}
	/**
	 *  Input interface for DrivingSettings.SetUltrasonicSettings
	 */
	export interface tInSetUltrasonicSettings {
		ultrasonicEnable: Boolean
	}
	/**
	 *  Input interface for DrivingSettings.SetAdvancedDriveSettings
	 */
	export interface tInSetAdvancedDriveSettings {
		drivePastWire: tDrivingSettings_DrivePastWire
	}
	/**
	 *  Output interface for DrivingSettings.ResetFollowWireOut
	 */
	export interface tOutResetFollowWireOut {
		startPositionId: Number
		loopWire: Number
		runningDistance: Number
		proportion: Number
		startPositionEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.ResetFollowWireOut
	 */
	export interface tInResetFollowWireOut {
		startPositionId: Number
	}
	/**
	 *  Output interface for DrivingSettings.ResetFollowWireIn
	 */
	export interface tOutResetFollowWireIn {
		loopWire: Number
		delayTime: Number
		followWireInEnable: Number
	}
	/**
	 *  Input interface for DrivingSettings.ResetFollowWireIn
	 */
	export interface tInResetFollowWireIn {
		loopWire: Number
	}

	export function GetSubareaSettingsI(codec : any, args : tInGetSubareaSettings): Promise<tOutGetSubareaSettings> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetSubareaSettings(subareaId: ' + __args.subareaId+ ')');
		} catch(error) {
			return new Promise<tOutGetSubareaSettings>((res,reject) => { reject(error);});
		}
	}

	export function GetSubareaSettings(codec : any, subareaId: Number): Promise<tOutGetSubareaSettings> {
		return GetSubareaSettingsI(codec, {
				subareaId: subareaId
		});
	}

	export function GetExitAngles(codec : any): Promise<tOutGetExitAngles> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetExitAngles()');
		} catch(error) {
			return new Promise<tOutGetExitAngles>((res,reject) => { reject(error);});
		}
	}

	export function GetCorridorI(codec : any, args : tInGetCorridor): Promise<tOutGetCorridor> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetCorridor(loopWire: ' + __args.loopWire+ ')');
		} catch(error) {
			return new Promise<tOutGetCorridor>((res,reject) => { reject(error);});
		}
	}

	export function GetCorridor(codec : any, loopWire: Number): Promise<tOutGetCorridor> {
		return GetCorridorI(codec, {
				loopWire: loopWire
		});
	}

	export function GetFollowWireOutI(codec : any, args : tInGetFollowWireOut): Promise<tOutGetFollowWireOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetFollowWireOut(startPositionId: ' + __args.startPositionId+ ')');
		} catch(error) {
			return new Promise<tOutGetFollowWireOut>((res,reject) => { reject(error);});
		}
	}

	export function GetFollowWireOut(codec : any, startPositionId: Number): Promise<tOutGetFollowWireOut> {
		return GetFollowWireOutI(codec, {
				startPositionId: startPositionId
		});
	}

	export function GetFollowWireInI(codec : any, args : tInGetFollowWireIn): Promise<tOutGetFollowWireIn> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetFollowWireIn(loopWire: ' + __args.loopWire+ ')');
		} catch(error) {
			return new Promise<tOutGetFollowWireIn>((res,reject) => { reject(error);});
		}
	}

	export function GetFollowWireIn(codec : any, loopWire: Number): Promise<tOutGetFollowWireIn> {
		return GetFollowWireInI(codec, {
				loopWire: loopWire
		});
	}

	export function GetTestFollowWireOutI(codec : any, args : tInGetTestFollowWireOut): Promise<tOutGetTestFollowWireOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetTestFollowWireOut(forFutureUse: ' + __args.forFutureUse+ ')');
		} catch(error) {
			return new Promise<tOutGetTestFollowWireOut>((res,reject) => { reject(error);});
		}
	}

	export function GetTestFollowWireOut(codec : any, forFutureUse: Number): Promise<tOutGetTestFollowWireOut> {
		return GetTestFollowWireOutI(codec, {
				forFutureUse: forFutureUse
		});
	}

	export function GetTestFollowWireInI(codec : any, args : tInGetTestFollowWireIn): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.GetTestFollowWireIn(forFutureUse: ' + __args.forFutureUse+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetTestFollowWireIn(codec : any, forFutureUse: Number): Promise<Number> {
		return GetTestFollowWireInI(codec, {
				forFutureUse: forFutureUse
		});
	}

	export function GetFollowGpsPosOut(codec : any): Promise<tOutGetFollowGpsPosOut> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetFollowGpsPosOut()');
		} catch(error) {
			return new Promise<tOutGetFollowGpsPosOut>((res,reject) => { reject(error);});
		}
	}

	export function GetGpsSettings(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetGpsSettings()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetCSRange(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetCSRange()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function GetUltrasonicSettings(codec : any): Promise<Boolean> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetUltrasonicSettings()');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function GetAdvancedDriveSettings(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('DrivingSettings.GetAdvancedDriveSettings()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetSubareaSettingsI(codec : any, args : tInSetSubareaSettings): Promise<tOutSetSubareaSettings> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetSubareaSettings(subareaId: ' + __args.subareaId+ ',gardenShape: ' + __args.gardenShape+ ',localIntCutLevel: ' + __args.localIntCutLevel+ ',cutCurrentIntTime: ' + __args.cutCurrentIntTime+ ',maxConfigWheelSpeed: ' + __args.maxConfigWheelSpeed+ ',localIntCutEnable: ' + __args.localIntCutEnable+ ')');
		} catch(error) {
			return new Promise<tOutSetSubareaSettings>((res,reject) => { reject(error);});
		}
	}

	export function SetSubareaSettings(codec : any, subareaId: Number, gardenShape: Number, localIntCutLevel: Number, cutCurrentIntTime: Number, maxConfigWheelSpeed: Number, localIntCutEnable: Number): Promise<tOutSetSubareaSettings> {
		return SetSubareaSettingsI(codec, {
				subareaId: subareaId,
				gardenShape: gardenShape,
				localIntCutLevel: localIntCutLevel,
				cutCurrentIntTime: cutCurrentIntTime,
				maxConfigWheelSpeed: maxConfigWheelSpeed,
				localIntCutEnable: localIntCutEnable
		});
	}

	export function SetExitAnglesI(codec : any, args : tInSetExitAngles): Promise<tOutSetExitAngles> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetExitAngles(reversingDistance: ' + __args.reversingDistance+ ',minAngle1: ' + __args.minAngle1+ ',maxAngle1: ' + __args.maxAngle1+ ',minAngle2: ' + __args.minAngle2+ ',maxAngle2: ' + __args.maxAngle2+ ',propFirstSector: ' + __args.propFirstSector+ ')');
		} catch(error) {
			return new Promise<tOutSetExitAngles>((res,reject) => { reject(error);});
		}
	}

	export function SetExitAngles(codec : any, reversingDistance: Number, minAngle1: Number, maxAngle1: Number, minAngle2: Number, maxAngle2: Number, propFirstSector: Number): Promise<tOutSetExitAngles> {
		return SetExitAnglesI(codec, {
				reversingDistance: reversingDistance,
				minAngle1: minAngle1,
				maxAngle1: maxAngle1,
				minAngle2: minAngle2,
				maxAngle2: maxAngle2,
				propFirstSector: propFirstSector
		});
	}

	export function SetCorridorI(codec : any, args : tInSetCorridor): Promise<tOutSetCorridor> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetCorridor(loopWire: ' + __args.loopWire+ ',minDistToWire: ' + __args.minDistToWire+ ',maxDistToWire: ' + __args.maxDistToWire+ ',wireInGuideCorridor: ' + __args.wireInGuideCorridor+ ',autoDistanceEnable: ' + __args.autoDistanceEnable+ ')');
		} catch(error) {
			return new Promise<tOutSetCorridor>((res,reject) => { reject(error);});
		}
	}

	export function SetCorridor(codec : any, loopWire: Number, minDistToWire: Number, maxDistToWire: Number, wireInGuideCorridor: Number, autoDistanceEnable: Number): Promise<tOutSetCorridor> {
		return SetCorridorI(codec, {
				loopWire: loopWire,
				minDistToWire: minDistToWire,
				maxDistToWire: maxDistToWire,
				wireInGuideCorridor: wireInGuideCorridor,
				autoDistanceEnable: autoDistanceEnable
		});
	}

	export function SetFollowWireOutI(codec : any, args : tInSetFollowWireOut): Promise<tOutSetFollowWireOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetFollowWireOut(startPositionId: ' + __args.startPositionId+ ',loopWire: ' + __args.loopWire+ ',runningDistance: ' + __args.runningDistance+ ',proportion: ' + __args.proportion+ ',startPositionEnable: ' + __args.startPositionEnable+ ')');
		} catch(error) {
			return new Promise<tOutSetFollowWireOut>((res,reject) => { reject(error);});
		}
	}

	export function SetFollowWireOut(codec : any, startPositionId: Number, loopWire: Number, runningDistance: Number, proportion: Number, startPositionEnable: Number): Promise<tOutSetFollowWireOut> {
		return SetFollowWireOutI(codec, {
				startPositionId: startPositionId,
				loopWire: loopWire,
				runningDistance: runningDistance,
				proportion: proportion,
				startPositionEnable: startPositionEnable
		});
	}

	export function SetFollowWireInI(codec : any, args : tInSetFollowWireIn): Promise<tOutSetFollowWireIn> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetFollowWireIn(loopWire: ' + __args.loopWire+ ',delayTime: ' + __args.delayTime+ ',followWireInEnable: ' + __args.followWireInEnable+ ')');
		} catch(error) {
			return new Promise<tOutSetFollowWireIn>((res,reject) => { reject(error);});
		}
	}

	export function SetFollowWireIn(codec : any, loopWire: Number, delayTime: Number, followWireInEnable: Number): Promise<tOutSetFollowWireIn> {
		return SetFollowWireInI(codec, {
				loopWire: loopWire,
				delayTime: delayTime,
				followWireInEnable: followWireInEnable
		});
	}

	export function SetTestFollowWireOutI(codec : any, args : tInSetTestFollowWireOut): Promise<tOutSetTestFollowWireOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetTestFollowWireOut(startPositionId: ' + __args.startPositionId+ ',minMaxDistance: ' + __args.minMaxDistance+ ')');
		} catch(error) {
			return new Promise<tOutSetTestFollowWireOut>((res,reject) => { reject(error);});
		}
	}

	export function SetTestFollowWireOut(codec : any, startPositionId: Number, minMaxDistance: Number): Promise<tOutSetTestFollowWireOut> {
		return SetTestFollowWireOutI(codec, {
				startPositionId: startPositionId,
				minMaxDistance: minMaxDistance
		});
	}

	export function SetTestFollowWireInI(codec : any, args : tInSetTestFollowWireIn): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetTestFollowWireIn(loopWire: ' + __args.loopWire+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetTestFollowWireIn(codec : any, loopWire: Number): Promise<Number> {
		return SetTestFollowWireInI(codec, {
				loopWire: loopWire
		});
	}

	export function SetFollowGpsPosOutI(codec : any, args : tInSetFollowGpsPosOut): Promise<tOutSetFollowGpsPosOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetFollowGpsPosOut(xPos: ' + __args.xPos+ ',yPos: ' + __args.yPos+ ')');
		} catch(error) {
			return new Promise<tOutSetFollowGpsPosOut>((res,reject) => { reject(error);});
		}
	}

	export function SetFollowGpsPosOut(codec : any, xPos: Number, yPos: Number): Promise<tOutSetFollowGpsPosOut> {
		return SetFollowGpsPosOutI(codec, {
				xPos: xPos,
				yPos: yPos
		});
	}

	export function SetGpsSettingsI(codec : any, args : tInSetGpsSettings): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetGpsSettings(GPSNavigationEnable: ' + __args.GPSNavigationEnable+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetGpsSettings(codec : any, GPSNavigationEnable: Number): Promise<Number> {
		return SetGpsSettingsI(codec, {
				GPSNavigationEnable: GPSNavigationEnable
		});
	}

	export function SetCSRangeI(codec : any, args : tInSetCSRange): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetCSRange(range: ' + __args.range+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetCSRange(codec : any, range: Number): Promise<Number> {
		return SetCSRangeI(codec, {
				range: range
		});
	}

	export function SetUltrasonicSettingsI(codec : any, args : tInSetUltrasonicSettings): Promise<Boolean> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetUltrasonicSettings(ultrasonicEnable: ' + __args.ultrasonicEnable+ ')');
		} catch(error) {
			return new Promise<Boolean>((res,reject) => { reject(error);});
		}
	}

	export function SetUltrasonicSettings(codec : any, ultrasonicEnable: Boolean): Promise<Boolean> {
		return SetUltrasonicSettingsI(codec, {
				ultrasonicEnable: ultrasonicEnable
		});
	}

	export function SetAdvancedDriveSettingsI(codec : any, args : tInSetAdvancedDriveSettings): Promise<Number> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.SetAdvancedDriveSettings(drivePastWire: ' + __args.drivePastWire+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetAdvancedDriveSettings(codec : any, drivePastWire: tDrivingSettings_DrivePastWire): Promise<Number> {
		return SetAdvancedDriveSettingsI(codec, {
				drivePastWire: drivePastWire
		});
	}

	export function ResetFollowWireOutI(codec : any, args : tInResetFollowWireOut): Promise<tOutResetFollowWireOut> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.ResetFollowWireOut(startPositionId: ' + __args.startPositionId+ ')');
		} catch(error) {
			return new Promise<tOutResetFollowWireOut>((res,reject) => { reject(error);});
		}
	}

	export function ResetFollowWireOut(codec : any, startPositionId: Number): Promise<tOutResetFollowWireOut> {
		return ResetFollowWireOutI(codec, {
				startPositionId: startPositionId
		});
	}

	export function ResetFollowWireInI(codec : any, args : tInResetFollowWireIn): Promise<tOutResetFollowWireIn> {
		let __args = args;

		try {
			return codec.send('DrivingSettings.ResetFollowWireIn(loopWire: ' + __args.loopWire+ ')');
		} catch(error) {
			return new Promise<tOutResetFollowWireIn>((res,reject) => { reject(error);});
		}
	}

	export function ResetFollowWireIn(codec : any, loopWire: Number): Promise<tOutResetFollowWireIn> {
		return ResetFollowWireInI(codec, {
				loopWire: loopWire
		});
	}
}

export namespace MowerCommands {
	/**
	 *  Input interface for MowerCommands.StartWithOverrideTime
	 */
	export interface tInStartWithOverrideTime {
		time: Number
	}
	/**
	 *  Input interface for MowerCommands.ParkDuringTime
	 */
	export interface tInParkDuringTime {
		time: Number
	}
	/**
	 *  Input interface for MowerCommands.CreateLogMsg
	 */
	export interface tInCreateLogMsg {
		level: Number
		id: Number
	}
	/**
	 *  Input interface for MowerCommands.SetWirelessLinkStatus
	 */
	export interface tInSetWirelessLinkStatus {
		connectionStatus: Number
		rssi: Number
		wirelessLinkId: Number
	}

	export function Stop(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.Stop()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function Start(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.Start()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function HomeMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.HomeMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ManualMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ManualMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function AutoMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.AutoMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ChargeThenAutoMode(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ChargeThenAutoMode()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TestFollowIn(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.TestFollowIn()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TestFollowOut(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.TestFollowOut()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function TiltCalibration(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.TiltCalibration()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetAll(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetAll()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetAllUser(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetAllUser()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetSystem(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetSystem()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetCurDriving(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetCurDriving()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetCurUser(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetCurUser()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetAppConstants(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetAppConstants()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ConfirmFault(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ConfirmFault()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function PrepareStart(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.PrepareStart()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function FactoryResetAllConstants(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetAllConstants()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StopPrepareStart(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.StopPrepareStart()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StopFollowWire(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.StopFollowWire()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StartSpotCutting(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.StartSpotCutting()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function CalibrateGuide(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.CalibrateGuide()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ConfirmWarning(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ConfirmWarning()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ConfirmInfo(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ConfirmInfo()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StopSpotCutting(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.StopSpotCutting()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ClearSettingsChangedFlag(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ClearSettingsChangedFlag()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ClearUserSettingsIndex(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ClearUserSettingsIndex()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetGeofenceAlarm(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.SetGeofenceAlarm()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ForceStandby(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ForceStandby()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StartWithOverrideTimeI(codec : any, args : tInStartWithOverrideTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('MowerCommands.StartWithOverrideTime(time: ' + __args.time+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function StartWithOverrideTime(codec : any, time: Number): Promise<Number> {
		return StartWithOverrideTimeI(codec, {
				time: time
		});
	}

	export function ParkDuringTimeI(codec : any, args : tInParkDuringTime): Promise<Number> {
		let __args = args;

		try {
			return codec.send('MowerCommands.ParkDuringTime(time: ' + __args.time+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ParkDuringTime(codec : any, time: Number): Promise<Number> {
		return ParkDuringTimeI(codec, {
				time: time
		});
	}

	export function CreateLogMsgI(codec : any, args : tInCreateLogMsg): Promise<Number> {
		let __args = args;

		try {
			return codec.send('MowerCommands.CreateLogMsg(level: ' + __args.level+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function CreateLogMsg(codec : any, level: Number, id: Number): Promise<Number> {
		return CreateLogMsgI(codec, {
				level: level,
				id: id
		});
	}

	export function SetWirelessLinkStatusI(codec : any, args : tInSetWirelessLinkStatus): Promise<Number> {
		let __args = args;

		try {
			return codec.send('MowerCommands.SetWirelessLinkStatus(connectionStatus: ' + __args.connectionStatus+ ',rssi: ' + __args.rssi+ ',wirelessLinkId: ' + __args.wirelessLinkId+ ')');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function SetWirelessLinkStatus(codec : any, connectionStatus: Number, rssi: Number, wirelessLinkId: Number): Promise<Number> {
		return SetWirelessLinkStatusI(codec, {
				connectionStatus: connectionStatus,
				rssi: rssi,
				wirelessLinkId: wirelessLinkId
		});
	}

	export function FactoryResetComplete(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.FactoryResetComplete()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}

	export function ClearStartupSeq(codec : any): Promise<Number> {
		let __args = {};

		try {
			return codec.send('MowerCommands.ClearStartupSeq()');
		} catch(error) {
			return new Promise<Number>((res,reject) => { reject(error);});
		}
	}
}

export namespace HardwareControl {
	/**
	 *  Input interface for HardwareControl.BladeMotorSpeed
	 */
	export interface tInBladeMotorSpeed {
		bladeMotorSpeed: Number
	}
	/**
	 *  Input interface for HardwareControl.WheelMotorsPower
	 */
	export interface tInWheelMotorsPower {
		leftWheelMotorPower: Number
		rightWheelMotorPower: Number
	}
	/**
	 *  Input interface for HardwareControl.DisplayTestPattern
	 */
	export interface tInDisplayTestPattern {
		testPattern: Number
	}
	/**
	 *  Input interface for HardwareControl.TrigWatchdog
	 */
	export interface tInTrigWatchdog {
		watchdogTime: Number
	}
	/**
	 *  Input interface for HardwareControl.Backlight
	 */
	export interface tInBacklight {
		backlight: Number
	}
	/**
	 *  Input interface for HardwareControl.Sound
	 */
	export interface tInSound {
		beeper: Number
		buzzerAlarm: Number
	}
	/**
	 *  Input interface for HardwareControl.KeyboardStatus
	 */
	export interface tInKeyboardStatus {
		keyboard: Number
	}
	/**
	 *  Input interface for HardwareControl.KeyboardTest
	 */
	export interface tInKeyboardTest {
		keyboard: Number
	}
	/**
	 *  Input interface for HardwareControl.WheelMotorPattern
	 */
	export interface tInWheelMotorPattern {
		wheelMotorPattern: Number
	}
	/**
	 *  Input interface for HardwareControl.LogToMsgList
	 */
	export interface tInLogToMsgList {
		level: Number
		id: Number
	}
	/**
	 *  Input interface for HardwareControl.ActivateLoopSensors
	 */
	export interface tInActivateLoopSensors {
		loopSensors: Number
	}
	/**
	 *  Input interface for HardwareControl.HeadlightTest
	 */
	export interface tInHeadlightTest {
		headlight: Number
	}
	/**
	 *  Input interface for HardwareControl.GenerateHostMsg
	 */
	export interface tInGenerateHostMsg {
		hostMsgCode: Number
	}
	/**
	 *  Input interface for HardwareControl.Headlight
	 */
	export interface tInHeadlight {
		headlight: Number
	}
	/**
	 *  Input interface for HardwareControl.ComboardStandbyTimer
	 */
	export interface tInComboardStandbyTimer {
		standbyTime: Number
	}
	/**
	 *  Input interface for HardwareControl.ComboardStandbyTimeout
	 */
	export interface tInComboardStandbyTimeout {
		standbyTime: Number
	}

	export function BladeMotorSpeedI(codec : any, args : tInBladeMotorSpeed): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.BladeMotorSpeed(bladeMotorSpeed: ' + __args.bladeMotorSpeed+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function BladeMotorSpeed(codec : any, bladeMotorSpeed: Number): Promise<void> {
		return BladeMotorSpeedI(codec, {
				bladeMotorSpeed: bladeMotorSpeed
		});
	}

	export function WheelMotorsPowerI(codec : any, args : tInWheelMotorsPower): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.WheelMotorsPower(leftWheelMotorPower: ' + __args.leftWheelMotorPower+ ',rightWheelMotorPower: ' + __args.rightWheelMotorPower+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function WheelMotorsPower(codec : any, leftWheelMotorPower: Number, rightWheelMotorPower: Number): Promise<void> {
		return WheelMotorsPowerI(codec, {
				leftWheelMotorPower: leftWheelMotorPower,
				rightWheelMotorPower: rightWheelMotorPower
		});
	}

	export function DisplayTestPatternI(codec : any, args : tInDisplayTestPattern): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.DisplayTestPattern(testPattern: ' + __args.testPattern+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function DisplayTestPattern(codec : any, testPattern: Number): Promise<void> {
		return DisplayTestPatternI(codec, {
				testPattern: testPattern
		});
	}

	export function TrigWatchdogI(codec : any, args : tInTrigWatchdog): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.TrigWatchdog(watchdogTime: ' + __args.watchdogTime+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function TrigWatchdog(codec : any, watchdogTime: Number): Promise<void> {
		return TrigWatchdogI(codec, {
				watchdogTime: watchdogTime
		});
	}

	export function BacklightI(codec : any, args : tInBacklight): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.Backlight(backlight: ' + __args.backlight+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Backlight(codec : any, backlight: Number): Promise<void> {
		return BacklightI(codec, {
				backlight: backlight
		});
	}

	export function SoundI(codec : any, args : tInSound): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.Sound(beeper: ' + __args.beeper+ ',buzzerAlarm: ' + __args.buzzerAlarm+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Sound(codec : any, beeper: Number, buzzerAlarm: Number): Promise<void> {
		return SoundI(codec, {
				beeper: beeper,
				buzzerAlarm: buzzerAlarm
		});
	}

	export function KeyboardStatusI(codec : any, args : tInKeyboardStatus): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.KeyboardStatus(keyboard: ' + __args.keyboard+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function KeyboardStatus(codec : any, keyboard: Number): Promise<void> {
		return KeyboardStatusI(codec, {
				keyboard: keyboard
		});
	}

	export function KeyboardTestI(codec : any, args : tInKeyboardTest): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.KeyboardTest(keyboard: ' + __args.keyboard+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function KeyboardTest(codec : any, keyboard: Number): Promise<void> {
		return KeyboardTestI(codec, {
				keyboard: keyboard
		});
	}

	export function WheelMotorPatternI(codec : any, args : tInWheelMotorPattern): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.WheelMotorPattern(wheelMotorPattern: ' + __args.wheelMotorPattern+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function WheelMotorPattern(codec : any, wheelMotorPattern: Number): Promise<void> {
		return WheelMotorPatternI(codec, {
				wheelMotorPattern: wheelMotorPattern
		});
	}

	export function LogToMsgListI(codec : any, args : tInLogToMsgList): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.LogToMsgList(level: ' + __args.level+ ',id: ' + __args.id+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function LogToMsgList(codec : any, level: Number, id: Number): Promise<void> {
		return LogToMsgListI(codec, {
				level: level,
				id: id
		});
	}

	export function ActivateLoopSensorsI(codec : any, args : tInActivateLoopSensors): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.ActivateLoopSensors(loopSensors: ' + __args.loopSensors+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ActivateLoopSensors(codec : any, loopSensors: Number): Promise<void> {
		return ActivateLoopSensorsI(codec, {
				loopSensors: loopSensors
		});
	}

	export function HeadlightTestI(codec : any, args : tInHeadlightTest): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.HeadlightTest(headlight: ' + __args.headlight+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function HeadlightTest(codec : any, headlight: Number): Promise<void> {
		return HeadlightTestI(codec, {
				headlight: headlight
		});
	}

	export function GenerateHostMsgI(codec : any, args : tInGenerateHostMsg): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.GenerateHostMsg(hostMsgCode: ' + __args.hostMsgCode+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function GenerateHostMsg(codec : any, hostMsgCode: Number): Promise<void> {
		return GenerateHostMsgI(codec, {
				hostMsgCode: hostMsgCode
		});
	}

	export function RestartExtBoard(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.RestartExtBoard()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function HeadlightI(codec : any, args : tInHeadlight): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.Headlight(headlight: ' + __args.headlight+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function Headlight(codec : any, headlight: Number): Promise<void> {
		return HeadlightI(codec, {
				headlight: headlight
		});
	}

	export function USEnable(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.USEnable()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function USDisable(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.USDisable()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function USEnableWithSDLog(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.USEnableWithSDLog()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function USEnableLeft(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.USEnableLeft()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function USEnableRight(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.USEnableRight()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ComboardPowerOff(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.ComboardPowerOff()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ComboardStandby(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.ComboardStandby()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ComboardStandbyTimerI(codec : any, args : tInComboardStandbyTimer): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.ComboardStandbyTimer(standbyTime: ' + __args.standbyTime+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ComboardStandbyTimer(codec : any, standbyTime: Number): Promise<void> {
		return ComboardStandbyTimerI(codec, {
				standbyTime: standbyTime
		});
	}

	export function ComboardStandbyTimeoutI(codec : any, args : tInComboardStandbyTimeout): Promise<void> {
		let __args = args;

		try {
			return codec.send('HardwareControl.ComboardStandbyTimeout(standbyTime: ' + __args.standbyTime+ ')');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}

	export function ComboardStandbyTimeout(codec : any, standbyTime: Number): Promise<void> {
		return ComboardStandbyTimeoutI(codec, {
				standbyTime: standbyTime
		});
	}

	export function ComboardSleep(codec : any): Promise<void> {
		let __args = {};

		try {
			return codec.send('HardwareControl.ComboardSleep()');
		} catch(error) {
			return new Promise<void>((res,reject) => { reject(error);});
		}
	}
}

export namespace CurrentStatus {
	/**
	 *  Output interface for CurrentStatus.GetStatus
	 */
	export interface tOutGetStatus {
		mainState: Number
		subState: Number
		mode: Number
		timerStatusAndOpMode: Number
		hostMessage: Number
	}
	/**
	 *  Output interface for CurrentStatus.GetExtendedStatus
	 */
	export interface tOutGetExtendedStatus {
		mainState: Number
		subState: Number
		mode: Number
		timerStatusAndOpMode: Number
		hostMessage: Number
		timeNextStart: Number
		sourceNextStart: Number
		currentUnixTime: Number
		totalRunningTime: Number
		batteryPercent: Number
		optionFlags: Number
		gpsNavigationStatus: Number
		configChangeCount: Number
		connectionStatus: Number
		rssi: Number
		gpsStatus: Number
	}
	/**
	 *  Output interface for CurrentStatus.GetStatusKeepAlive
	 */
	export interface tOutGetStatusKeepAlive {
		mainState: Number
		subState: Number
		mode: Number
		timerStatusAndOpMode: Number
		hostMessage: Number
	}
	/**
	 *  Output interface for CurrentStatus.GetExtendedStatusKeepAlive
	 */
	export interface tOutGetExtendedStatusKeepAlive {
		mainState: Number
		subState: Number
		mode: Number
		timerStatusAndOpMode: Number
		hostMessage: Number
		timeNextStart: Number
		sourceNextStart: Number
		currentUnixTime: Number
		totalRunningTime: Number
		batteryPercent: Number
		optionFlags: Number
		gpsNavigationStatus: Number
		configChangeCount: Number
		connectionStatus: Number
		rssi: Number
		gpsStatus: Number
	}

	export function GetStatus(codec : any): Promise<tOutGetStatus> {
		let __args = {};

		try {
			return codec.send('CurrentStatus.GetStatus()');
		} catch(error) {
			return new Promise<tOutGetStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetExtendedStatus(codec : any): Promise<tOutGetExtendedStatus> {
		let __args = {};

		try {
			return codec.send('CurrentStatus.GetExtendedStatus()');
		} catch(error) {
			return new Promise<tOutGetExtendedStatus>((res,reject) => { reject(error);});
		}
	}

	export function GetStatusKeepAlive(codec : any): Promise<tOutGetStatusKeepAlive> {
		let __args = {};

		try {
			return codec.send('CurrentStatus.GetStatusKeepAlive()');
		} catch(error) {
			return new Promise<tOutGetStatusKeepAlive>((res,reject) => { reject(error);});
		}
	}

	export function GetExtendedStatusKeepAlive(codec : any): Promise<tOutGetExtendedStatusKeepAlive> {
		let __args = {};

		try {
			return codec.send('CurrentStatus.GetExtendedStatusKeepAlive()');
		} catch(error) {
			return new Promise<tOutGetExtendedStatusKeepAlive>((res,reject) => { reject(error);});
		}
	}
}
