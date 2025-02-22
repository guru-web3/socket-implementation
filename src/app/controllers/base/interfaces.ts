/**
 * Base controller configuration
 */
export interface BaseConfig {
  /**
   *  Determines if this controller is enabled
   */
  disabled?: boolean;
}

/**
 * Base state representation
 */
export interface BaseState {
  /**
   * Unique name for this controller
   */
  name?: string;
}

export interface IController<C, S> {
  defaultConfig: C;

  defaultState: S;

  name: string;

  get state(): S;

  get config(): C;

  update(state: Partial<S>, overwrite?: boolean): void;

  configure(
    config: Partial<C>,
    overwrite?: boolean,
    fullUpdate?: boolean,
  ): void;
}
