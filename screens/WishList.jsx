function WishList() {
  return (
    <ScrollView>
      <LogoHeader style={styles.logoHeader} />
      <Text style={styles.header}>{testedUser.houseHeaderInfo}</Text>
      <View style={styles.mapAndImageContainer}>
        <Swiper
          style={styles.swiper}
          onIndexChanged={onImageSwipe}
          loop={false}
          showsPagination={false}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </Swiper>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icons} onPress={addToWishlist}>
          <Image
            source={require("../assets/../assets/wishlistButton.png")}
            style={styles.icons}
          />
          <Text style={styles.iconText}>Add in{"\n"}Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons} onPress={goToChat}>
          <Image
            source={require("../assets/chatButton.png")}
            style={styles.icons}
          />
          <Text style={styles.iconText}>Contact{"\n"}host</Text>
        </TouchableOpacity>
        <View style={styles.commentContainer}>
          <TouchableOpacity style={styles.icons} onPress={goToCommentPage}>
            <View style={styles.ratingContainer}>
              <Image
                source={require("../assets/yellowStar.png")}
                style={[styles.icons, { marginLeft: -12 }]}
              />
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {testedUser.comments.rating}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {testedUser.comments.review}
              </Text>
              <Text
                style={[
                  styles.iconText,
                  { fontSize: 18, marginRight: -20, marginLeft: 5 },
                ]}
              >
                reviews
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default WishList;
