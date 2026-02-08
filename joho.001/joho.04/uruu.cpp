#include<iostream>
using namespace std;
int main (void){
    int n,m;
    cin>>n>>m;
    switch(m){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
        cout<<"31"<<endl;
        break;

        case 4:
        case 6:
        case 9:
        case 11:
        cout<<"30"<<endl;
        break;

        case 2:
        if((n%4==0)&&!((n%100==0)&&(n%400!=0))){
            cout<<"29"<<endl;
        }else{
            cout<<"28"<<endl;
        }
        break;
        default:
            cout<<"-1"<<endl;
        break;
        
    }
} 