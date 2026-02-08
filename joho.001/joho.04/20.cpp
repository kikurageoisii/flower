#include<iostream>
#include <array>
using namespace std;
int main(void){
    int n=0;
    array <int,20>numbers;
    for(int i=0;i<20;i++){
        cin>>numbers[i];
        n+=numbers[i];
    }
    cout<<n<<endl;
}