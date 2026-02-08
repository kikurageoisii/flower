#include <iostream>
using namespace std;

void read_array (int a[],int n){ //この時点ではconst使ってはいけない
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
}

int main(void){
    int n=30;
    int a[n];
    read_array(a,n);
    int f=0;
    cin>>f;
    cout<<a[f]<<endl;
}