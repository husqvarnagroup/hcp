#define CATCH_CONFIG_MAIN
#include <catch.hpp>
#include <hcp_range.hpp>
#include <hcp_scan.h>
extern "C" {
#include <hcp_vector.h>
#include <hcp_library.h>
#include <hcp_runtime.h>
}

    struct Node {
        int value = 13;
        Node() {}
        Node(int value) : value(value) {}
    };
hcp_Int cmpNodes(void* pLhs, void* pRhs, void* pContext)
{
  return ((Node*)pLhs)->value == ((Node*)pRhs)->value ? 0 : 1;
}
TEST_CASE( "Hcp", "vector" ) {
  hcp_tHost host;
  hcp_DefaultHost(&host);

  auto state = (hcp_tState*)host.malloc_(hcp_SizeOfState(),0);
  auto ok = hcp_NewState(state,&host);
  REQUIRE(ok == HCP_NOERROR);

  HCP_VECTOR(Node, Vector,4);
  auto testPush = [](Node val,Vector& vec) {
      auto oldSize = std::distance(begin(vec),end(vec));
      auto index = hcp_Size_t{0};
      auto error = hcp_Push(&vec.header,&val,&index);
      REQUIRE(error == HCP_NOERROR);
      REQUIRE(index == oldSize);
      REQUIRE(std::distance(begin(vec),end(vec)) == oldSize + 1);
      REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);
      auto outVal = (Node*)hcp_ValueAt(&vec.header,index);
      REQUIRE(outVal->value == val.value);
  };
  auto testPushEmpty = [](Node val,Vector& vec) {
      auto oldSize = std::distance(begin(vec),end(vec));
      auto index = hcp_Size_t{0};
      auto error = hcp_PushEmpty(&vec.header,&index);
      REQUIRE(error == HCP_NOERROR);
      REQUIRE(index == oldSize);
      REQUIRE(std::distance(begin(vec),end(vec)) == oldSize + 1);
      REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);

      auto inplaceVal = (Node*)hcp_ValueAt(&vec.header,index);
      new(inplaceVal) Node{val};

      auto outVal = (Node*)hcp_ValueAt(&vec.header,index);
      REQUIRE(outVal->value == val.value);
  };
    auto vec = Vector();
  SECTION("Dynamic memory") {
    auto error = HCP_INITIALIZEVECTOR(state, &(vec.header), vec.fixed, Node, nullptr, cmpNodes, nullptr);
    REQUIRE(error == HCP_NOERROR);
    REQUIRE(std::distance(begin(vec),end(vec)) == 0);
    REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);

    SECTION("Push") {
      testPush(Node{11},vec);
      testPush(Node{12},vec);
      testPush(Node{13},vec);
      testPush(Node{14},vec);
    }
    SECTION("Push Empty") {
      testPushEmpty(Node{11},vec);
      testPushEmpty(Node{12},vec);
      testPushEmpty(Node{13},vec);
      testPushEmpty(Node{14},vec);
    }
  }

  SECTION("Static memory") {
    auto error = HCP_INITIALIZEVECTOR(nullptr, &(vec.header), vec.fixed, Node, nullptr, cmpNodes, nullptr);
    REQUIRE(error == HCP_NOERROR);
    REQUIRE(std::distance(begin(vec),end(vec)) == 0);
    REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);

    SECTION("Push") {
      testPush(Node(11),vec);
      testPush(Node(12),vec);
      testPush(Node(13),vec);
      testPush(Node(14),vec);
      hcp_Size_t index = 0;
      auto val = Node{15};
      auto error = hcp_Push(&vec.header,&val,&index);
      REQUIRE(error == HCP_VECTORFULL);
    }
    SECTION("Push Empty") {
      testPushEmpty(Node(11),vec);
      testPushEmpty(Node(12),vec);
      testPushEmpty(Node(13),vec);
      testPushEmpty(Node(14),vec);
      hcp_Size_t index = 0;
      auto error = hcp_PushEmpty(&vec.header,&index);
      REQUIRE(error == HCP_VECTORFULL);
    }
  }
  REQUIRE(std::distance(begin(vec),end(vec)) == 4); 
  {
    hcp_Boolean found = false;
    auto val = Node{14};
    auto ix = hcp_FindFirst(&vec.header,0,&val,&found);
    REQUIRE(found == true);
    REQUIRE(ix == 3);
  }
  {
    hcp_Boolean found = false;
    auto val = Node{12};
    auto ix = hcp_FindFirst(&vec.header,1,&val,&found);
    REQUIRE(found == true);
    REQUIRE(ix == 1);
  }
  {
    hcp_Boolean found = true;
    auto val = Node{12};
    auto ix = hcp_FindFirst(&vec.header,2,&val,&found);
    REQUIRE(found == false);
  }
  auto oldSize = 4;
  hcp_Pop(&vec.header,3);
  REQUIRE(std::distance(begin(vec),end(vec)) == --oldSize); 
  REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);
  hcp_Pop(&vec.header,1);
  REQUIRE(std::distance(begin(vec),end(vec)) == --oldSize); 
  REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);
  hcp_Pop(&vec.header,0);
  REQUIRE(std::distance(begin(vec),end(vec)) == --oldSize); 
  REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);
  hcp_Pop(&vec.header,6);
  REQUIRE(std::distance(begin(vec),end(vec)) == oldSize); 
  REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);
  hcp_Pop(&vec.header,0);
  REQUIRE(std::distance(begin(vec),end(vec)) == --oldSize); 
  REQUIRE(std::distance(begin(vec),end(vec)) == vec.header.length);

    hcp_Int err = hcp_CloseState(state);
    REQUIRE(err == HCP_NOERROR);
    host.free_(state,0);
}
