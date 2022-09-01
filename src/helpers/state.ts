export const stateWidth: number = 16;

export const makeState = (n: number): string => {
    let s: string[] = [];
    for(let i: number = 0; i < n; i++){
        s[i] = `${Math.floor(Math.random() * 10)}`;
    }
    let sReduce: string = s.reduce((x: string, y: string): string => {
        return x + y; 
    });
    return sReduce
}

export const getState = (): string => {
    let ls: string | null = localStorage.getItem('state');
    if(ls === null){
        localStorage.setItem('state', makeState(stateWidth));
    }
    return ls === null ? "" : ls;
}