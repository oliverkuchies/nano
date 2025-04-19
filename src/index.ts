type NanoInstance<InitialState = unknown> = 
{
    value: InitialState
}

const stateHashmap : Record<string, unknown> = {};

function storeInMap<InitialState>(identifier: string, instance: NanoInstance<InitialState>) {
    stateHashmap[identifier] = instance;
    return instance;
}

function findOrCreateState<InitialState>(identifier: string, initialState: InitialState) : NanoInstance<InitialState> {
    return storeInMap(identifier, createState<InitialState>(initialState))
}

function createState<InitialState>(initialState: InitialState) : NanoInstance<InitialState> {
    let currentState : InitialState = initialState;

    function setState(value : InitialState) {
        currentState = value;
    }

    const state = new Proxy(
        {
            value: currentState
        },
        {
            get: () => {
                return currentState; 
            },
            set: (_obj, _prop, value) => {
                setState(value);
                return true;
            }
        }
    );

    return state
}

export function useNano<InitialState>(identifier : string, initialState : InitialState) : NanoInstance<InitialState> {
    return findOrCreateState<InitialState>(identifier, initialState);
} 