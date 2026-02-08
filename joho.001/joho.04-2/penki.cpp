#include<iostream>
using namespace std;
int main (void){
    int a,b,c;
    cin>>a>>b>>c;
    
    if((0<=a&&a<256)&&(0<=b&&b<256)&&(0<=c&&c<256)){
    if(a==b&&a==c){
        cout<<"1"<<endl;
    }else if((a==b)||(b==c)||a==c){
        cout<<"2"<<endl;
    }else{
        cout<<"3"<<endl;
    }
    }
}