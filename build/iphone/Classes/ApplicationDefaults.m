/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"ltOiHCCKCAeXEQDqeJ8fIERAYAJX6E6W"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"PtbaBKTNQTxwzTjMS9l54rrWmpjczN4o"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"cIoZGcdF8BPxbQtapVtZkZyFTQYarjIH"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"wH8nlzVAbld8wy8VmHMpt517rt01Zq6Z"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"YaUnrPGd9VSzIOWq5tXfmiAqAKfukdgL"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"C6lA0I2aKocRRtHImdIxzufO8hoCd9cO"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end