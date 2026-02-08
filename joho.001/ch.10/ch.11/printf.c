#include <stdio.h>

int main(void){
    printf("100\n"); //100(文字列)
    printf("%d\n",100); //100(数値)
    printf("11+1\n"); //11+1(文字列)
    printf("%d\n",11+1);//12(数値)
    printf("1\n");//1を表示(標準出力)
    fprintf(stdout,"1\n");//1を表示(標準出力)
    FILE* fp = stdout;
    fprintf(fp,"1\n");//1を表示(標準出力)
    FILE* fp2=fopen("text.txt","w");//wは上書き
    fprintf(fp2,"hello\n");
    fclose(fp2);//closeしてから処理が行われる
    FILE* fp3=fopen("text.txt","a");//aは追加
    fprintf(fp3,"ohayou\n");
    fclose(fp3);
}