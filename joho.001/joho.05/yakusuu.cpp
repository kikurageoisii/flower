#include <iostream>
using namespace std;

int yakusu(int n, int x)
{
  int k=0;
  if(x%n==0){
    k=1;
  }
  return k;
}

int main()
{
  int n = 0;
  int x = 0;
  cin >> n >> x;
  cout << yakusu(n, x) << endl;
  return 0;
}