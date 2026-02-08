#include <stdio.h>
#include <stdlib.h>//rand()
#include <time.h> //時間を利用して乱数の初期化。srand()を使う。

int main(void){
    srand((unsigned)time(NULL));//実行時の時間を元に、乱数のseedを決める。
    int n=0;
    double roku=0.0;
    scanf("%d",&n);
    for(int i=0;i<n;i++){
        int deme=rand()%6+1;//１から整数６個
        printf("%d",deme);
        if(deme==6){
            roku++;
        }
        
    }
    printf("\n");
    printf("%lf\n",roku/n);
}   