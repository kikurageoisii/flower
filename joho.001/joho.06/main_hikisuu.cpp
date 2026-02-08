#include <stdio.h>

int main(int argc, char *argv[]){//charは8ビット整数型。半角を表示するときによく使う。[]は配列という意味で文字列
  int i; //intは32ビット整数型。
  
  printf("文字列の個数 %d\n",argc);
  for(i=0;i<argc;i++)
    printf("%d 番目の文字列 %s\n",i,argv[i]);
  return 0;
}
