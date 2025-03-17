// Time Complexity: O(1)
function sum_to_n_a(n: number): number {
    if (n <= 0) return 0;
    return (n * (n + 1)) / 2;
}

// Time Complexity: O(n)
function sum_to_n_b(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Time Complexity: O(n)
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    // @ts-ignore
    return Array.from({ length: n }, (_: any, i: number) => i + 1).reduce((acc: any, val: any) => acc + val, 0);

}