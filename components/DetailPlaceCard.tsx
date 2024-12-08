import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ImageGrid from './ImageGrid';
import { useAuth } from '@/contexts/AuthContext';
import { authRoutes } from '@/routes';
import { WebRootPath } from '@/constants/WebRootPath';
import { CommonUtils } from '@/helpers/commonUtils';
import { PlaceDetailType } from '@/types/place';

interface PlaceDetailCardProps {
  place: PlaceDetailType;
}

export default function PlaceDetailCard({ place }: PlaceDetailCardProps) {
  const { user } = useAuth();
  const openingDescriptions = ['Đã đóng cửa', 'Đang mở cửa', 'Mở cả ngày', 'Chưa xác định'];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.group1}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{place.rating}</Text>
            <Star size={16} color="#FFB800" fill="#FFB800" />
            <Text style={styles.reviews}>({place.reviews.length})</Text>
            <Text style={styles.dot}> · </Text>
            <Text style={styles.category}>{CommonUtils.capitalize(place.type)}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.status,
                place.openingStatus == 1 || place.openingStatus == 2 ? styles.openStatus : styles.closeStatus,
              ]}
            >
              {openingDescriptions[place.openingStatus]}
            </Text>
            <Text style={styles.dot}> · </Text>
            <Text style={styles.openTime}>{place.openingHours}</Text>
          </View>
        </View>

        <ImageGrid imageList={place.photos} />

        <View style={styles.group2}>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="globe-outline" size={24} color="#1a73e8" />
            <Text style={styles.address}>{place.address ?? 'Unknown'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.reviewContainer}>
          {user ? (
            <>
              <Text style={styles.reviewsTitle}>Xếp hạng và đánh giá</Text>
              <View style={styles.ratingInput}>
                <Image source={{ uri: '/placeholder.svg?height=40&width=40' }} style={styles.userAvatar} />
                <View style={styles.starsInput}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity key={i}>
                      <Ionicons name="star-outline" size={32} color="#666" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.noAuthReviewWrapper}>
              <Text style={styles.reviewsTitle}>Xếp hạng và đánh giá</Text>
              <View style={styles.noAuthReview}>
                <Text style={{ fontSize: 14 }}>Vui lòng đăng nhập để đánh giá địa điểm này</Text>
                <Pressable style={styles.loginButton} onPress={() => router.replace(authRoutes.login)}>
                  <Text style={styles.loginText}>Đăng nhập</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewsTitle}>Bài đánh giá ({place.reviews.length})</Text>
          <View style={{ gap: 16, paddingBottom: 8 }}>
            {place.reviews.map((item) => {
              return (
                <View key={item.reviewId} style={styles.review}>
                  <View style={styles.reviewHeader}>
                    <Image
                      src={`${WebRootPath.imagePath}/${item?.userAvatar}`}
                      style={[styles.reviewerAvatar]}
                    />
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{item.userName}</Text>
                    </View>
                  </View>

                  <View style={styles.ratingContainer22}>
                    <View style={styles.stars}>
                      {[...Array(item.rating)].map((i) => (
                        <Ionicons key={i} name="star" size={16} color="#FFD700" />
                      ))}
                      {[...Array(5 - item.rating)].map((i) => (
                        <Ionicons key={i} name="star-outline" size={16} color="#FFD700" />
                      ))}
                    </View>
                    <Text style={styles.timeAgo}>{CommonUtils.formatDate(item.lastModifiedDate)}</Text>
                  </View>

                  <Text style={styles.reviewText}>{item.comment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 4,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#70757A',
  },
  group1: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  group2: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  group3: {
    backgroundColor: '#fff',
  },
  group4: {
    backgroundColor: '#fff',
  },
  group5: {
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  address: {
    color: '#70757A',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginRight: 4,
    fontSize: 14,
  },
  reviews: {
    marginLeft: 4,
    color: '#70757A',
    fontSize: 14,
  },
  dot: {
    color: '#70757A',
  },
  price: {
    color: '#70757A',
    fontSize: 14,
  },
  category: {
    color: '#70757A',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
  },
  openStatus: {
    color: 'rgb(25, 134, 57)',
  },
  closeStatus: {
    color: '#D93025',
  },
  openTime: {
    color: '#70757A',
    fontSize: 14,
  },
  distance: {
    color: '#70757A',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ecf2fe',
    borderRadius: 999,
  },
  actionText: {
    color: '#1A73E8',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 2,
  },

  infoContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  editText: {
    color: '#1a73e8',
    fontSize: 16,
  },
  viewAll: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
  },
  viewAllText: {
    color: '#1a73e8',
    fontSize: 16,
    fontWeight: '500',
  },

  p2container: {
    padding: 16,
    backgroundColor: 'white',
  },
  ratingContainer1: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  reviewCount: {
    fontSize: 16,
    color: '#666',
  },
  ratingBars: {
    gap: 8,
    marginBottom: 16,
  },
  ratingBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  // review section
  reviewContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  ratingInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  starsInput: {
    flexDirection: 'row',
    gap: 8,
  },
  // No auth review section
  noAuthReviewWrapper: {},
  noAuthReview: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loginButton: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: '#007BFF',
  },
  loginText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 24,
  },
  addPhotoText: {
    color: '#1a73e8',
    fontSize: 14,
  },

  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  review: {
    gap: 6,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer22: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  reactionText: {
    fontSize: 14,
    color: '#666',
  },
});
