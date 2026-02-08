#include<iostream>
using namespace std;
int main(void){
    int a,b;
    cin>>a>>b;
    if((a==1&&b==2)||(a==0&&b==1)||(a==2&&b==0))cout<<"o"<<endl;
    else if((a==1&&b==0)||(a==0&&b==2)||(a==2&&b==1))cout<<"x"<<endl;
    else if ((a==1&&b==1)||(a==2&&b==2)||(a==0&&b==0))cout<<"-"<<endl;
    else cout<<"-1"<<endl;
}