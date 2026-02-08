#include <stdio.h>

void input(float array[],int size){
    for(int i=0;i<size;i++){
        scanf("%f",&array[i]);
    }
}
 
float average(float array[],int size){
    float ans=0.0;
    for(int i=0;i<size;i++){
        ans+=array[i];
    }
    return (float)ans/size;
}
 
void max_min(float date[],const int N,float * max,float* min)
{
    
    *max=date[0];
    
    for(int i=1;i<N;i++){
        if(*max<date[i]) *max=date[i];
    }

    *min=date[0];
    for(int i=1;i<N;i++){
        if(*min>date[i]) *min=date[i];
    }
}

 
 
void output(float array[],int size){
    for(int i=0;i<size;i++){
        printf("%.2f ",array[i]);
    }
    printf("\n");

}
 
int main(void)
{
    /* main関数内は変更しないこと */
    /* プログラム作成中に以下を一時的に変更することは構わない．*/
    /* 最終的に以下の形となっていればよい． */
 
    const int N = 10;  /* データ個数．この値を 5 や 20 に変更しても正しく動作すること */
    float data[N];     /* 実数型配列 */
    float max, min;    /* 最大値・最小値を格納 */
 
    input(data, N);    /* 10個の要素をKBDから入力する関数*/
 
    printf("平均値 = %f\n", average(data,N) );   /* 平均値を算出する関数 */
 
    max_min(data, N, &max, &min);    /* 最大値と最小値を算出する関数 */
 
    printf("最大値 = %f,最小値 = %f \n",max,min);
 
    output(data, N);    /* 配列の中身を画面に出力する関数 */
 
    return 0;
}