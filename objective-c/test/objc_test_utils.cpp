#include "objc_test_utils.hpp"
#include <json.hpp>

using nlohmann::json;

std::string createModel(std::vector<std::string> const& types) {
  auto model = json{
        {"header",{}},
        {"types",json::array({})},
        {"methods",json::array({})},
  };
  auto method = [](auto& type) {
      return json{
        {"command", "CallWith" + type},
        {"family", "Basic"},
        {"inParams", json::array({json::object_t{
          {"name", "param"},
          {"type", type},
          {"length", "1"}
          }}) },
          {"outParams", json::array({{
          {"name", "result"},
          {"type", type},
          {"length", "1"}
          }}) }
      };
  };
  std::transform(begin(types), end(types), std::back_inserter(model["methods"]), method);
  return model.dump();
}


