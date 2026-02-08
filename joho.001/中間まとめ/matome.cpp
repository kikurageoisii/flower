#include <iostream>
using namespace std;
#include <cmath> // fmod,sqrtの使用
#include <iomanip> //fix,setprecisionの使用
#include <string> 
#include <vector> //動的配列の導入
                  //（サイズが可変、要素の追加・削除・挿入・表示
#include<stdlib.h>//atoi
#include<stdio.h> //Cのヘッダー

//電卓
double keisan(const double kazu,const char kigou,const double kkazu){
    double ans = 0.0; // double型の宣言は小数点
  
    switch (kigou){ //switch文の書き方注意
        case '+':
            ans = kazu +kkazu;
            break; //breakを忘れない

        case '-':
            ans = kazu - kkazu;
            break;
        
        case '*':
            ans = kazu * kkazu;
            break;

        case '/':
        if(kkazu!=0){
            ans = kazu / kkazu;
        }else{
            ans = nan("");
        }
            break;
        
        case '%':
            ans = fmod(kazu,kkazu);
            break;
        
        default:
        ans=nan(""); 
    }
    return ans;
}


//配列を読み取る
void read_array (int a[],int n){ //この時点ではconst使ってはいけない
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
}

//配列を表示して、改行。
void print_array(int a[],int n){
    for(int i=0;i<n;i++){
        cout<<a[i]<<" ";
    }
    cout<<endl;
}

// 小さい順に並び替え
void tiisaijun(int a[],int n){
    for(int e=n-1;-1<e;e--){
        for(int i=0;i<e;i++){
            if(!(a[i]<a[i+1])){
                int e=a[i];
                int d=a[i+1];
                a[i]=d;
                a[i+1]=e;
            }
        }
    }
}

//入れ替え
void irekae(int n,int& a, int& b,int& c){ //入れ替えるときは&
    int al,bl,cl;
    al=a;
    bl=b;
    cl=c;
    switch(n){
        case 1:
        b=al;
        a=bl;
        break;
        
        case 2:
        b=cl;
        c=bl;
        break;
        
        case 3:
        a=cl;
        c=al;
        break;
    }
}


/* array関数の使い方
int main(void){
    int n=0;
    cin>>n;
    int a[n+1];  //配列は大きめに作る
    read_array(a,n);
    tiisaijun(a,n);
    print_array(a,n);
    
}
*/


//小数点n桁で表示
void syousuu(double syousuu,const int keta) {
    
    cout << fixed << setprecision(keta) << syousuu << endl;
    /*使い方
int main(void){
    double n=0.0;
    int a=0;
    cin>>n>>a;
    cout<< syousuuten(n,a);

}
*/
}





/* memo

while文の書き方
while(式){
    コード
}

true == 1 // onみたいなイメージ
flase !=1 

論理演算子
&& かつ
||　または
a=<x<=bではなくa=<x&&x<=bと書く

break; 便利


do{
    コード;
}while(式)

a<c<b //という書き方では、コンパイルエラーにはならないが、正しくない
(a<c)&&(c<b)//という書き方ではないとダメ。
zsh: segmentation fault  ./k は配列系のエラー

int x[5]={};
全て0で初期化される

0で割らない

continue便利

bool型 true と falseをとる
bool isPrime(int number) {
    if (number <= 1) return false;
    for (int i = 2; i <= number / 2; ++i) {
        if (number % i == 0) return false;
    }
    return true;
}

３桁かつ半角スペース区切り
printf("%3d ", x);

入力の最後は改行
 配列の宣言は文字+=1;

 char a;
    scanf("%c",&a); //%cは１文字、char *%sは複数の文字列
    printf("%d %x\n",a,a);//%dで10進法、%xで16進法

    siki[i] = atoi(&siki[i]); //文字列を数字として読み取る　&を忘れない

    //vectorについて
    std::vector<int> numbers;
      
      numbers.push_back(1);//要素の追加
      numbers.pop_back();// 要素の削除（最後の要素）
      numbers.insert(numbers.begin() + 1, 4);//numbers[1] 要素の挿入
      numbers.erase(numbers.begin() + 1);  // 要素の削除（指定位置）

      vector<int> D(d,0);


*/

