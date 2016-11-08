
Pod::Spec.new do |s|
  s.name         = "Hcp"
  s.version      = "0.0.1"
  s.summary      = "A short description of Hcp."
  s.description  = "Husqvarna communication protocols"
  s.homepage     = "https://github.com/husqvarnagroup/hcp"
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.author       = { "Jonas Persson" => "jonas.persson@consid.se" }
  s.source       = { :git => "https://github.com/husqvarnagroup/hcp.git", :branch => "master"}
  s.source_files  = "c/src", "c/include", "cpp/src/hcp_defaulthost.cpp", "cpp/src/hcp_scan.cpp", "cpp/include", "objective-c/src", "objective-c/include"
  s.public_header_files = 'objective-c/include/*.h'
  s.osx.deployment_target = '10.11'
#s.ios.deployment_target = '8.4.1'
  s.requires_arc = true
  s.osx.xcconfig = { "LIBRARY_SEARCH_PATHS" => "/usr/local/lib", "HEADER_SEARCH_PATHS" => "/usr/local/include" }
  s.osx.libraries = 'uv'
  s.library = 'c++'
  s.ios.dependency 'libuv'
end
