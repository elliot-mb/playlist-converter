export const stateWidth: number = 16;

export const makeState = (n: number) => {
    let s: string[] = [];
    for(let i: number = 0; i < n; i++){
        s[i] = `${Math.floor(Math.random() * 10)}`;
    }
    let sReduce = s.reduce((x: string, y: string): string => {
        return x + y; 
    });
    return sReduce
}

export const getState = (): string => {
    if(localStorage['state'] === undefined){
        localStorage['state'] = makeState(stateWidth);
    }
    return localStorage['state'];
}