#include <stdio.h>

const int R = 4;
const int C = 4;

void scan_table(int table[]) {
    for(int i=0; i<R*C; i++) {
        scanf("%d",&table[i]);
    }
}

int search_table(int table[]) {
    int count = 0;

    for(;!table[count];count++){
        
    }

    return count;
}


int main(void) {
    int table[R][C];
    scan_table(table[0]);  // 多次元配列の読み込み
    int *p = table[0];  // ポインタを先頭アドレスに合わせる
    printf("%d\n", search_table(p));  // 結果の出力
    return 0;
}