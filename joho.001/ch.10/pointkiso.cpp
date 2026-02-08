#include <stdio.h>

void times(int* p,int n){
    (*p)*=n;
}

int main(void)
{
    int x = 0;
    int n = 0;
    scanf("%d %d", &x, &n);

    int *p = &x; //ポインタ変数pに，xのアドレスを代入

    times(p, n); //ポインタ渡し

    printf("%d\n", x);
    return 0;
}
