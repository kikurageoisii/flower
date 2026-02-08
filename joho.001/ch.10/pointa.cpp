#include <iostream>
using namespace std;

int main(void){
    int a=0;
    int* p=&a; //&aの場所をpに代入 //pはint型のpointer(指し示す)
               //pにはアドレスしか入らない。数字は入らない
    double b=0.0;
    double* q;
    *q=3.14; //*アドレス＝値
    q=&b;//アドレス＝アドレス
    double *q;//古いc言語
    cout<<a<<endl<<p<<endl;

    //eは誤り　
    double* e;
    // e=&a;があると大丈夫
    *e=3.14; //eには家がない

//以下公式　
    double j=0;
    double* r =&j;

    
    
}

void func(double* b){
    *b=3.14; //bはアドレス
}

int main(void){
    double a=0;
    func(&a);
    cout<<a;
}

//スナップドラゴン アームプロセッサー

int main(void){
    char s[]="Meiji University";
    char* p=s; //最初のアドレスを示す
               //アドレス(変数)＝アドレス(固定)
    printf("*p=%c\n",*p);
    *p +=3; //文字の値を３増やす
            //MがPになる
    printf("*p=%c\n",*p);
    p+=3;//p=jとなる
    printf("*p=%c\n",*p);


}

int main(void){
    const char* ab[]={
        "Abe"
        "baby"
        "can"
        "dady"
        "end"
    };
    int i=0;
    scanf("%d",&i);
    printf("%s\n",ab[i]);

}



  
