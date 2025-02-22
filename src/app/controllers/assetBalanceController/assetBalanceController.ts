import { BaseConfig, BaseController, BaseState } from "../../controllers/base";
import AssetsInfoController, {
  AccountAssetsInfo,
} from "../../controllers/assetsController/assetsController";
import BalancesController from "../../controllers/balanceController/balancesControllers";
import { SupportedNetworkId } from "@/app/services/common-utils/chainUtils";
import useUserStore from "@/store/userStore";

export interface MainControllerConfig extends BaseConfig {
  assetsInfoConfig: AssetsInfoController["config"];
  balanceControllerConfig: BalancesController["config"];
}
export interface MainControllerState extends BaseState {
  assetsInfoState: AssetsInfoController["state"];
  balanceControllerState: BalancesController["state"];
}

export interface IMainControllerOptions {
  config: MainControllerConfig;

  state: MainControllerState;
  setStates: (state: Partial<MainControllerState>) => void;
}

export default class AssetsBalanceController extends BaseController<
  MainControllerConfig,
  MainControllerState
> {
  private static instance: AssetsBalanceController;

  static getInstance(params: IMainControllerOptions) {
    if (!AssetsBalanceController.instance) {
      AssetsBalanceController.instance = new AssetsBalanceController(params);
    }
    return AssetsBalanceController.instance;
  }

  assetsController: AssetsInfoController;

  balanceController: BalancesController;

  getAccounts: () => string[];

  
  // Temp Config as the default config is not working
  tempConfig: MainControllerConfig;

  constructor({ config, state, setStates }: IMainControllerOptions) {
    super({ config, state });
    this.defaultConfig = {
      assetsInfoConfig: config.assetsInfoConfig,
      balanceControllerConfig: config.balanceControllerConfig,
      // ...config,
    };
    
    this.getAccounts = () => {
      const { address } = useUserStore.getState();

      if (address) {
        return [address];
      }
      return [];
    };
    this.tempConfig = config;
    // getAccounts


    this.assetsController = new AssetsInfoController({
      config: config.assetsInfoConfig,
      state: state.assetsInfoState, //state.assetsInfoState,
      accountPreferenceAPI: {
        getAccounts: () => this.getAccounts(),
        getAccountAssetInfo: () => {
          return {
            customAssets: {},
            shownAssets: [],
          } as AccountAssetsInfo;
        },
      },
    });

    this.assetsController.on("store", async (state) => {
      setStates({ assetsInfoState: state });
      if (this.balanceController) {
        await this.balanceController.refreshBalances();
      }
      // useAssetsInfoStore.setState(state);
    });

    this.balanceController = new BalancesController({
      config: config.balanceControllerConfig,
      state: state.balanceControllerState,
      assetInfoAPI: this.assetsController,
      accountPreferenceAPI: {
        getAccounts: () => this.getAccounts(),
        getSupportedNetworks: () => {
          return SupportedNetworkId();
        },
      },
    });
    this.balanceController.on("store", async (state) => {
      setStates({ balanceControllerState: state });
      // useBalancesStore.setState(state);
    });


    // Save preference state before closing the window
    // function createBeforeUnloadHandler( mainController: AssetsBalanceController) {
    //   // Save preference state before closing the window
    //     navigator.sendBeacon(
    //       "/api/v1/preference",
    //       JSON.stringify({
    //         state : {
    //           assetsInfoState: {
    //             customAssets: mainController.assetsController.state
    //           },
    //         },
    //       }),
    //     );
    //     window.removeEventListener("beforeunload", handleBeforeUnload);
    // }
    // const handleBeforeUnload = () => createBeforeUnloadHandler(this);
    // window.addEventListener("beforeunload", handleBeforeUnload);
  }

  start() {
    this.balanceController.interval =
      this.tempConfig.balanceControllerConfig.interval;
  }
  stop() {
    this.balanceController.interval = 0;
  }
}
