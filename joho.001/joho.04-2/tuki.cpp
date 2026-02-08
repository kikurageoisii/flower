#include<iostream>
using namespace std;
int main(void){
    int m;
    cin>>m;
    switch(m){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
        cout<<"long"<<endl;
        break;
        case 2:
        case 4:
        case 6:
        case 9:
        case 11:
        cout<<"short"<<endl;
        break;
        default:
        cout<<"error"<<endl;
    }
}