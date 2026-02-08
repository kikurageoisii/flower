#include <stdio.h>
//#include<string.h>

char* caesar_encription(char str_in[],char str_out[],int key)
{
    //keyは0~25;
    key%=26;
    if(key>0)key-=26;
    int i=0;
    for( i=0;str_in[i]!='\0';i++){
        str_out[i]=str_in[i]+key;
        if(str_out[i]<'a')str_out[i]=str_out[i]+(-'a'+'z')+1;//()で括らないと127の向こう側に行く
    }
    str_out[i]='\0'; //終端文字はつけなければならない
    return str_out;

}     

char* caesar_encription2(char* si,char sout[],int key)//scanfに対応してポインタ型
{
    char* so=sout;
    while(*si){// '\0'まで読み取る
      int ni=*si-'a';//int型にすれば外にはみ出ない
      int no= ni+key;
      no%=26;
      if(no<0)no+=26;
      *so= no+'a'; //*soにno+'a'という値を代入
      si++;//アドレスを薦める
      so++;
    }
    *so = '\0';  
    return sout; 
}   

int main(void)
{
  const int N = 100;
  char str_in[N+1];
  char str_out[N+1];
  int key = 0;

  scanf("%s", str_in);
  scanf("%d", &key);

  printf("%s\n", caesar_encription(str_in, str_out, key));
  return 0;
}